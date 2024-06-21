from flask import Flask, jsonify
import json

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run()
