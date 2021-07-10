import io
import os

def load_food_name():
    names = [line.rstrip('\n').lower() for line in open("fruits.dict")]
    return names

def recognize_food(img_path, list_foods):
    foods = []
    # Imports the Google Cloud client library
    from google.cloud import vision
        
    # Instantiates a client
    client = vision.ImageAnnotatorClient()

    # The name of the image file to annotate
    file_name = os.path.abspath(img_path)

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

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




