from openai import OpenAI
import pandas as pd


## filtering of words for prompt

questions_data = {}

def printData():
  print('Received answers in gpt integration script: \n' + str(questions_data))

# minecraft_df = pd.read_csv('Test-Datensatz_fur_Alex.csv')
#
# mc_mobs = minecraft_df[minecraft_df['Type'].isin(['mob'])]
#
# killer_tags = ['kill', 'mob', 'Hostile']
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
