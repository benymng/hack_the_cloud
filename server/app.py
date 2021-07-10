from flask import Flask, make_response, jsonify
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object("config")
CORS(app)


@app.route("/", methods=["GET"])
def index():
    data = {
        "success": "true"
    }

    return make_response(jsonify(data), 200)


if __name__ == "__main__":
    app.run()
