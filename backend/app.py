from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import requests
import gpt_integration

app = Flask(__name__)

# CRUCIAL to ensure POST the request is passed through correctly (sth sth prefetch, can look it up if you need)
CORS(app)


@app.route('/api/data')
def get_data():
    data = {
      'title': 'Quest4You',
      'message': 'Test!!!!'
    }

    return jsonify(data)


@app.route('/api/bartles_questions')
# returns the question dataset
def get_questions():
    question_dataset = {}
    with open('./data/bartles-questions.json') as file:
        questions_dataset = json.load(file)
    # return jsonify(questions_dataset)
    return questions_dataset


@app.route('/api/users/test')
def get_user():
    with open('./data/users.json') as file:
        user_data = json.load(file)["Beater"]
    return user_data


@app.route('/api/users/test/answers')
def get_user_answers():
    return get_user()["QuizAnswers"]


@app.route('/api/users/test/final_answers', methods=['GET', 'POST'])
def save_final_answers():
    data = request.json
    print('Final answers received in app.py:')
    print(data)
    #return jsonify(data)


@app.route('/api/users/test/owned-game-ids')
def get_owned_game_ids():
    owned_game_ids = []
    with open('./data/users.json') as file:
        owned_games = json.load(file)["Beater"]["OwnedGames"]

    for ownedGame in owned_games:
        owned_game_ids.append(ownedGame["Id"])
    owned_game_ids = jsonify(owned_game_ids)

    return owned_game_ids


@app.route('/api/games/<int:game_id>')
def get_game(game_id):
    with open('./data/games.json') as file:
        data = json.load(file)
        if game_id < 0 or game_id >= len(data):
            return jsonify({"error": "Game not found"}), 404
        game_data = data[game_id]
        game_info = {
          "GameId": game_data["GameId"],
          "Title": game_data.get("Title", game_data.get("name", ""))
        }
        print(game_info)
        return jsonify(game_info)


@app.route('/api/games/<int:game_id>/vanilla-quests')
def get_vanilla_quests(game_id):
    with open('./data/games.json') as file:
        data = json.load(file)
        if game_id < 0 or game_id >= len(data):
            return jsonify({"error": "Game not found"}), 404
        print(f'OriginalQuests: {data[game_id]["OriginalQuests"]}')
        return jsonify(data[game_id]["OriginalQuests"])


@app.route('/api/users/test/<int:game_id>/accepted-quests')
def get_accepted_quests(game_id):
    with open('./data/users.json') as file:
        data = json.load(file)
    if game_id < 0 or game_id >= len(data):
        return jsonify({"error": "Game not found"}), 404
    for game in data["Beater"]["OwnedGames"]:
        if game["Id"] == game_id:
            print(f'AcceptedQuests: {game["AcceptedQuests"]}')
            return jsonify(game["AcceptedQuests"])

    return jsonify({"error": "Game not found"}), 404


@app.route('/api/users/test/<int:game_id>/generated-quests')
def get_generated_quests(game_id):
    with open('./data/users.json') as file:
        data = json.load(file)
    if game_id < 0 or game_id >= len(data):
        return jsonify({"error": "Game not found"}), 404
    for game in data["Beater"]["OwnedGames"]:
        if game["Id"] == game_id:
            print(f'GeneratedQuests: {game["GeneratedQuests"]}')
            return jsonify(game["GeneratedQuests"])

    return jsonify({"error": "Game not found"}), 404





if __name__ == '__main__':
    app.run(debug=True)
