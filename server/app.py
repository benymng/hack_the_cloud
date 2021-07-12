from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
# from google.cloud import texttospeech
# from flask_socketio import SocketIO

from functions import scrape, vision


app = Flask(__name__)
app.config.from_object("config")
CORS(app)

# socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/", methods=["GET"])
def index():
    data = {
        "success": "true"
    }

    return make_response(jsonify(data), 200)


@app.route("/search", methods=["POST"])
def search():
    # if "query" not in request.json:
    #     return make_response(jsonify({}), 400)
    query = request.json["query"]
    url = "https://www.allrecipes.com/search/results/?search=" + query
    found_html = scrape.find_html(url)

    names = scrape.find_recipe_names(found_html)
    hrefs = scrape.find_href(found_html)
    images = scrape.find_image(found_html)
    descriptions = scrape.find_description(found_html)

    recipes_dict = dict.fromkeys(['name', 'href'])
    list_of_dicts = []

    for (name, link, image, description) in zip(names, hrefs, images, descriptions):
        recipes_dict = {"name": name, "href": link, "image": image, "description": description}
        list_of_dicts.append(recipes_dict)

    return make_response(jsonify(list_of_dicts), 200)


@app.route("/recipe", methods=["POST"])
def recipe():
    recipe_href = request.json["recipeHref"]
    recipe_dict = dict.fromkeys(['image', 'ingredients', 'steps', 'name', 'description'])

    found_html = scrape.find_html(recipe_href)
    directions = scrape.find_directions(found_html)
    ingredients = scrape.find_ingredients(found_html)
    image = scrape.find_image_for_recipe(found_html)
    name = scrape.find_title(found_html)
    description = scrape.find_description_for_recipe(found_html)

    recipe_dict['ingredients'] = ingredients
    recipe_dict['steps'] = directions
    recipe_dict['image'] = image
    recipe_dict['name'] = name
    recipe_dict['description'] = description

    return make_response(jsonify(recipe_dict), 200)

# app.route("/text-to-speech", methods=["POST"])
# def textToSpeech():
#     # Instantiates a client
#     client = texttospeech.TextToSpeechClient()

#     # Set the text input to be synthesized
#     synthesis_input = texttospeech.SynthesisInput(text="Hello,!")

#     # Build the voice request, select the language code ("en-US") and the ssml
#     # voice gender ("neutral")
#     voice = texttospeech.VoiceSelectionParams(
#         language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
#     )

#     # Select the type of audio file you want returned
#     audio_config = texttospeech.AudioConfig(
#         audio_encoding=texttospeech.AudioEncoding.MP3
#     )

#     # Perform the text-to-speech request on the text input with the selected
#     # voice parameters and audio file type
#     response = client.synthesize_speech(
#         input=synthesis_input, voice=voice, audio_config=audio_config
#     )

#     # The response's audio_content is binary.
#     with open("output.mp3", "wb") as out:
#         # Write the response to the output file.
#         out.write(response.audio_content)
#         print('Audio content written to file "output.mp3"')


@app.route('/ingredients', methods=["POST"])
def identify_ingredients():
    screenshot = request.json["screenshot"]

    image_name = vision.decode(screenshot)
    foods_found = vision.recognize_food(image_name, vision.load_food_name())
    url = vision.make_new_url(foods_found)

    found_html = scrape.find_html(url)

    names = scrape.find_recipe_names(found_html)
    hrefs = scrape.find_href(found_html)
    images = scrape.find_image(found_html)
    descriptions = scrape.find_description(found_html)

    recipes_dict = dict.fromkeys(['name', 'href'])
    list_of_dicts = []

    for (name, link, image, description) in zip(names, hrefs, images, descriptions):
        recipes_dict = {"name": name, "href": link, "image": image, "description": description}
        list_of_dicts.append(recipes_dict)

    return make_response(jsonify(list_of_dicts), 200)


# @socketio.on('socket')
# def socket():
#     print("Success")

# @socketio.on('my event')
# def handle_event(data):
#     print('event', data)

# @socketio.on('connect')
# def handle_connect():
#     print('conntected')

# @socketio.on('disconnect')
# def hand_disconnect():
#     print('disconnected')


if __name__ == "__main__":
    # socketio.run(app)
    app.run(port=5001)
