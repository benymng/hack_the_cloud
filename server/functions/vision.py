import io
import os
import base64
import uuid


def load_food_name():
    with open("functions/fruits.dict", "r") as f:
        names = [line.rstrip('\n').lower() for line in f.readlines()]
    return names


def decode(img_data):
    img_string = img_data.split(",")[-1]
    random_name = str(uuid.uuid4())
    with open(random_name + ".jpeg", "wb") as fh:
        fh.write(base64.b64decode(img_string))
    return random_name + ".jpeg"


def recognize_food(img_path, list_foods):
    foods = []
    # Imports the Google Cloud client library
    from google.cloud import vision

    # Instantiates a client
    client = vision.ImageAnnotatorClient()
    print("got client")

    # The name of the image file to annotate
    file_name = os.path.abspath(img_path)

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()
    print("read image")

    image = vision.Image(content=content)

    print("got image")
    # Performs label detection on the image file
    response = client.label_detection(image=image)
    print("got res")
    labels = response.label_annotations
    print("got labels")

    for label in labels:
        description = label.description.lower()
        if (description in list_foods):
            foods.append(description)

    return foods


def make_new_url(food_names):
    url = "https://www.allrecipes.com/search/results/?search="
    for food in food_names:
        url = url + "&IngIncl=" + food
    return url
