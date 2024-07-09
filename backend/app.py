from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import requests
import gpt_integration

app = Flask(__name__)

# CRUCIAL to ensure POST the request is passed through correctly (sth sth prefetch, can look it up if you need)
CORS(app)


@app.route('/api/questions')
def get_questions():
    questions = []
    questions_dataset = {}
    answers_dataset = {}
    with open('./data/bartles-questions.json') as question_file:
        questions_dataset = json.load(question_file)
        with open('./data/users.json') as answers_file:
            answers_dataset = json.load(answers_file)["Beater"]["QuizAnswers"]
    for idx, question in enumerate(questions_dataset):
        questions.append({
          "QuestionId": question["QuestionId"],
          "Question": question["Question"],
          "Answer1": question["Answer1"],
          "Answer2": question["Answer2"],
          "Outcome1": question["Outcome1"],
          "Outcome2": question["Outcome2"],
          "AnswerGiven": answers_dataset[str(idx)]
        })
    print(f'Created Question Dataset: {questions}')
    return jsonify(questions)


@app.route('/api/questions/length')
def get_questions_length():
    with open('./data/bartles-questions.json') as file:
        questions_dataset = json.load(file)
    return jsonify(len(questions_dataset))


@app.route('/api/users/test')
def get_user():
    with open('./data/users.json') as file:
        user_data = json.load(file)["Beater"]
    return user_data


@app.route('/api/users/test/player-type')
def get_player_type():
    with open('./data/users.json') as file:
        user_data = json.load(file)["Beater"]["PlayerType"]
    return jsonify(user_data)


@app.route('/api/users/test/has-answered-quiz')
def has_answered_quiz():
    with open('./data/users.json') as file:
        quiz_answers = json.load(file)["Beater"]["QuizAnswers"]

    print(quiz_answers)
    result = False
    print(result)
    for answer in quiz_answers.values():
        if answer:
            print(f'This: {answer}')
            result = True

    return jsonify(result)


@app.route('/api/users/test/answers')
def get_user_answers():
    return get_user()["QuizAnswers"]


@app.route('/api/users/test/answer_quiz', methods=['GET', 'POST'])
def save_final_answers():
    data = request.json
    print('Final answers received in app.py:')
    print(data)
    # TODO add setting of "HasAnsweredQuiz" Field
    return jsonify(data)


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


@app.route('/api/users/test/<int:game_id>/generate-quests')
def generate_quests(game_id):
    print(f'Generating Quests for {game_id}')
    # TODO implement generation process trigger
    return


@app.route('/api/users/test/<int:game_id>/accept-quest/<int:quest_id>')
def accept_quest(game_id, quest_id):
    print(f'Accepting Quest with {quest_id} for game {game_id}')
    # TODO implement quest accepting behavior
    return

# TODO Alex: add functionality to reset Answers in user.json for testing and showcase


if __name__ == '__main__':
    app.run(debug=True)
