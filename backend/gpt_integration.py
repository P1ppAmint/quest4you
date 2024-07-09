from openai import OpenAI
import pandas as pd


## filtering of words for prompt

questions_data = {}

player_type_profile = {
  'Socializer': 0,
  'Explorer': 0,
  'Killer': 0,
  'Achiever': 0
}

main_player_type = ''

minecraft_df = pd.read_csv('data/mc_object_data.csv')
tag_to_ptype_df = pd.read_csv('data/tag_to_ptype.csv')

def calculate_playertype(answer_dict):
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

    player_type = max(player_type_profile, key=player_type_profile.get)

    print('Main player type: ', player_type)

    # filter tags by player type
    appropriate_tags = tag_to_ptype_df[tag_to_ptype_df[player_type] >= 0.3]
    print(appropriate_tags)

    # random selection of tags (or even go as far as just include tags above 50%)

    filtered_df = minecraft_df.loc[minecraft_df['Objects'] == '']

    # filter out the tags of mc dataset
    for tag in appropriate_tags['Tag']:
        # print('Tag is: ',tag)
        tag_df = minecraft_df.loc[(minecraft_df['Action'].str.contains(tag) | minecraft_df['Type precise'].str.contains(tag))]
        filtered_df = pd.concat([filtered_df, tag_df], ignore_index=True)

    filtered_df.drop_duplicates(inplace=True)
    # print('Filtered df: ', filtered_df)

    # extract relevant tags for prompt generation
    # note: maybe include 'rarity' tag at some point too?
    filtered_prompt_df = filtered_df[['Objects', 'Action', 'Occurance']]
    print('Dataframe used for prompt:', filtered_prompt_df)

    # TODO trim down to 20 or so entries (or do we do that directly in the prompt then?)

    # TODO create prompt! (using the filtered filtered dataframe we got for this specific player type)
    # + think about feeding the verbs down to the prompt in a list as well! (try just extracting the matching tags as a list
    # or somehow filter the actual actions out of the extracted tags by playertype in any other way)

    # note: quest stuff ist in quest-data.ts ! (sprich da gibts schon ne struktur, die einfach befüllt werden muss)


def printData():
  print('Received answers in gpt integration script: \n' + str(questions_data))

# mc_mobs = minecraft_df[minecraft_df['Type'].isin(['mob'])]
# explorer_tags = []
#
#
# mc_stuff = minecraft_df.loc[(minecraft_df['Action'].isin(['kill']) & (minecraft_df['Type'].isin(['mob'])))]
#
# #fix mobs with more than one string in action (e.g. 'kill, breed') are not being picked up by selection
#
# # print(mc_mobs)
# print(mc_stuff)

## prompt generation
# client = OpenAI()
#
# game = 'Minecraft'
# player_type = 'Killer'
#
# # message_prompt = f"Create a new achievement that a player could achieve while playing the game {game}. " \
# #                  f"Orient the naming and description style to the one used in Steam's achievement system and orient " \
# #                  f"the choice of the achievement in regards to the Bartel player type {player_type}. " \
# #                  f"Also keep in mind not to recommend any achievement that is not possible to achieve in the game."
#
# message_prompt = f'With the attached dataframe, create an interesting achievement for the game Minecraft using the ' \
#                  f'answer template "Verb + Random amount between 5 and 10 + random object form the column "Objects" in the dataframe" ' \
#                  f'and generating a ' \
#                  f'compelling short description of the achievement for the player type {player_type}. The dataframe ' \
#                  f'follows:{mc_stuff}. Also respect the appropriate location of the item by watching the columns Traits ' \
#                  f'in the table.'
#
# # should be the last part of the filtering process
# completion = client.chat.completions.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {"role": "system", "content": "You are an intelligent assistant able to read in python dataframes and extract information from them in order to generate achievements for games."},
#     {"role": "user", "content": message_prompt}
#   ]
# )

# print(completion.choices[0].message)





# gibts andere achievements wie easter eggs achievements (bzw wie können wir die prompts so gestalten/designen, dass sie interessant sind)
# chatgpt api rsufinden und schauen, wie man die prompts übergibt? (schauen in welcher FOrm man das übertgitb + schauen, wie man daraus ein achievement generiert
# z.B. liste erstellen, filtern und dann an chatgpt senden)

# also basically erstmal chatgpt integrieren und schauen, ob man da ne prompt reinbekommt

# kann placeholder nehmen für concept + tag (tag wird dann assoziiert mit) also rausfinden, welche datanstruktur am besten passt dafür bzw. wie wir das entgegennehmen
# um daraus dann zu ermittlen welche wörter fir das prompt relevant sind

# Können auch versuchen eher elaboriertere achievements als die schablone zu kreieren
# kann schauen, was passiert wenn man random stuff reinpackt
# kann tags hinzufügen zu dem stuff

# schauen, wie man daten abspeichert

# den dictionary lesen wir aus der JSON file aus!!

# beim button 'Generieren' werden dann die daten aus dem JSON ausgelesen und ans backend gesendet
