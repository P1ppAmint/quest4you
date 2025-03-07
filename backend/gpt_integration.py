import json

from openai import OpenAI
import pandas as pd

questions_data = {}

player_type_profile = {
  'Socializer': 0,
  'Explorer': 0,
  'Killer': 0,
  'Achiever': 0
}

achievement_placeholder = {
  # "QuestId": 0,
  "QuestName": "Bake Bread",
  "QuestDescription": "Turn wheat into bread",
  # "QuestStatus": "completed"
}

game_data_dict = {
  0: {
    'Name': 'Minecraft',
    'Object data path': 'data/mc_object_data.csv',
    'Tag to ptype path': 'data/tag_to_ptype.csv'
  }
}

global main_player_type, is_completed

minecraft_df = pd.read_csv('data/mc_object_data.csv')
tag_to_ptype_df = pd.read_csv('data/tag_to_ptype.csv')


def calculate_playertype(answer_dict, user_id):
    global main_player_type
    for key in answer_dict:
        # print(f'Key: {key} + value: {answer_dict[key]}')

        value = answer_dict[key]

        if value == '+S':
            player_type_profile['Socializer'] += 1
        elif value == '+A':
            player_type_profile['Achiever'] += 1
        elif value == '+E':
            player_type_profile['Explorer'] += 1
        elif value == '+K':
            player_type_profile['Killer'] += 1

    print(player_type_profile)

    main_player_type = max(player_type_profile, key=player_type_profile.get)

    print('Main player type: ', main_player_type)

    # write player type + quiz answers to JSON file (for good measure :,) )
    with open('data/users.json') as users_json_file:
      users_json_data = json.load(users_json_file)

    users_json_data[user_id]["QuizAnswers"] = answer_dict
    users_json_data[user_id]["PlayerType"] = player_type_profile

    with open('data/users.json', 'w') as writing_json_file:
        json.dump(users_json_data, writing_json_file, indent=4)


def generate_quests(game_id, user_id):

    global is_completed
    is_completed = False

    with open('data/users.json') as users_json_file:
        users_json_data = json.load(users_json_file)

    player_type = users_json_data[user_id]["PlayerType"]
    player_type = max(player_type, key=player_type.get)

    print('Generating achievements for player type: ', player_type)

    game_object_df = pd.read_csv(game_data_dict[game_id]['Object data path'])
    tag_df = pd.read_csv(game_data_dict[game_id]['Tag to ptype path'])
    # filter tags by player type
    appropriate_tags = tag_df[tag_df[player_type] >= 0.3]

    appropriate_tags_list = appropriate_tags['Tag']
    # print('Appropriate tags: ', appropriate_tags_list)

    # random selection of tags (or even go as far as just include tags above 50%)
    filtered_df = game_object_df.loc[game_object_df['Objects'] == '']

    # filter out the tags of mc dataset
    for tag in appropriate_tags_list:
        # print('Tag is: ',tag)
        tag_df = game_object_df.loc[(game_object_df['Action'].str.contains(tag) | game_object_df['Type precise'].str.contains(tag))]
        filtered_df = pd.concat([filtered_df, tag_df], ignore_index=True)

    filtered_df.drop_duplicates(inplace=True)
    # print('Filtered df: ', filtered_df)

    # extract relevant tags for prompt generation
    # note: maybe include 'rarity' tag at some point too?
    filtered_prompt_df = filtered_df[['Objects', 'Action', 'Occurance']]
    # print('Dataframe used for prompt:', filtered_prompt_df)

    # TODO make sure the game can be read from the backend to be able to have more than one game
    current_game = 'Minecraft'

    message_prompt = (f'With the attached dataframe, create 5 interesting achievement for the game {current_game} using '
                      f'the tags provided in the tag_list {appropriate_tags_list} and the dataframe with objects_dataframe {filtered_prompt_df}.'
                      f'Make sure that the tag in the tag_list is contained in the "Action" column in the objects_dataframe.'
                      f'Output the achievement in a JSON !strictly! following the sample empty achievement format {achievement_placeholder}.'
                      f'Where adequate, provide the achievement with a reasonable number requirement under the JSON field "QuestDescription" '
                      f'(e.g. when creating a mining achievement, something'
                      f'like "mine eight Dirt blocks" could be put in the "QuestDescription" field). Also make sure to use'
                      f'double quotes in the json format')

    gpt_answer = prompt_chatgpt(message_prompt)

    # format string and insert achievements into JSON
    stripped_gpt_answer = (gpt_answer.split("```")[1])[5:]
    # print('Stripped GPT answer: ', stripped_gpt_answer)

    gpt_json = json.loads(stripped_gpt_answer)

    print('JSON-ified answer: ', gpt_json)

    print('First quest: ', gpt_json[0])

    # add achievements to user achievement json
    with open('data/users.json') as users_json_file:
        users_json_data = json.load(users_json_file)



    achievement_list = []
    for index in range(len(gpt_json)):
        achievement_list.append({
            "QuestId": users_json_data[user_id]["IdTracker"],
            "QuestName": gpt_json[index]["QuestName"],
            "QuestDescription": gpt_json[index]["QuestDescription"],
            "QuestStatus": "ongoing"

        })
        users_json_data[user_id]["IdTracker"] += 1

    users_json_data[user_id]["OwnedGames"][game_id]['GeneratedQuests'] = achievement_list
    # print('Personal JSON data: ', users_json_data)

    with open('data/users.json', 'w') as writing_json_file:
        json.dump(users_json_data, writing_json_file, indent=4)

    with open('data/users.json') as file:
        data = json.load(file)
        # print('Updated users JSON: ', data)

    is_completed = True


# accepting function on 'Accept Quest' button
def process_selected_quest(user_id, game_id, quest_id, accepted=True):
    # find selected quest in user json data and change element
    with open('data/users.json') as users_json_file:
        users_json_data = json.load(users_json_file)

    # obtain achievement from json file
    selected_quest = {}

    print('Selected quest ID: ', quest_id)

    for curr_quest in users_json_data[user_id]["OwnedGames"][game_id]["GeneratedQuests"]:
        if curr_quest["QuestId"] == quest_id:
            selected_quest = curr_quest

    print('Selected achievement: ', selected_quest)

    if accepted:
        # insert in accepted quests
        ### 1. extract current accepted quests as list
        curr_accepted_quests = list(users_json_data[user_id]["OwnedGames"][game_id]["AcceptedQuests"])
        # print('Currently accepted quests then: ', curr_accepted_quests)
        ### 2. append new quest to list
        curr_accepted_quests.append(selected_quest)
        # print('Currently accepted quests now: ', curr_accepted_quests)
        ### 3. overwrite accepted quest field in JSON
        users_json_data[user_id]["OwnedGames"][game_id]["AcceptedQuests"] = curr_accepted_quests

    # TODO make sure ids are distributed correctly!! (might impact our quest display, then see if we can automatically update our quest stuff)

    # delete from generated quests+
    for index in range(len(users_json_data[user_id]["OwnedGames"][game_id]["GeneratedQuests"])):
        if users_json_data[user_id]["OwnedGames"][game_id]["GeneratedQuests"][index] == quest_id:
            del users_json_data[user_id]["OwnedGames"][game_id]["GeneratedQuests"][quest_id]

    # write changes back to user.json
    with open('data/users.json', 'w') as writing_json_file:
        json.dump(users_json_data, writing_json_file, indent=4)



# think about joining functionality with decline quest option! (might have a bool that just triggers that we add the
# achievement to the accepted quest list)


def prompt_chatgpt(message):
    client = OpenAI()

    message_prompt = message

    global is_completed

    # should be the last part of the filtering process
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": "You are an intelligent assistant able to read in python dataframes and extract information from them in order to generate achievements for games."},
        {"role": "user", "content": message_prompt}
      ]
    )

    gpt_answer = completion.choices[0].message

    # print(gpt_answer.content)
    return gpt_answer.content


async def wait_gpt():
    while True:
        if is_completed:
            return True

