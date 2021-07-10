from flask import Flask, make_response, jsonify, request
from flask_cors import CORS

from functions import scrape, vision


app = Flask(__name__)
app.config.from_object("config")
CORS(app)


@app.route("/", methods=["GET"])
def index():
    data = {
        "success": "true"
    }

    return make_response(jsonify(data), 200)

@app.route("/search", methods=["POST"])
def search():
    query = request.json["query"]
    url = "https://www.allrecipes.com/search/results/?search=" + query
    found_html = scrape.find_html(url)

    names = scrape.find_recipe_names(found_html)
    hrefs = scrape.find_href(found_html)

    recipes_dict = dict.fromkeys(['name','href'])
    list_of_dicts = []

    for (name, link) in zip(names, hrefs):
        recipes_dict = {"name": name, "href": link}
        list_of_dicts.append(recipes_dict)

    return make_response(jsonify(list_of_dicts), 200)

if __name__ == "__main__":
    app.run()
