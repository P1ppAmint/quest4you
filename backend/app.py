from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/api/data')
def get_data():
    data = {
      'title': 'Quest4You',
      'message': 'Test!!!!'
    }

    return jsonify(data)


if __name__ == '__main__':
    app.run()
