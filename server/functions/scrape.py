import bs4, sys
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

# use BeatifulSoup to get the html of the page
def find_html(my_url):
    uClient = uReq(my_url)
    page_html = uClient.read()
    uClient.close()
    page_soup = soup(page_html, "html.parser")
    return page_soup

#after computer vision gets ingredients

def find_recipe_names(page_soup):
    recipe_names = []
    containers = page_soup.findAll("div", {"class": "search-results-content-container"})
    container = containers[0]
    names = container.findAll("h3", {"class": "card__title"})
    for name in names:
        recipe_names.append(name.text.strip())
    return recipe_names

def find_href(page_soup):
    hrefs = []
    start_url = "https://www.allrecipes.com/recipe"

    containers = page_soup.findAll("div", {"class": "search-results-content-container"})
    container = containers[0]
    for a in container.findAll('a', href=True):
        if start_url in a['href'] and a['href'] not in hrefs:
            hrefs.append(a['href'])
    return hrefs

def find_image(page_soup):
    images = []
    start_of_url = "https://imagesvc.meredithcorp.io"
    containers = page_soup.findAll("div", {"class": "search-results-content-container"})
    container = containers[0]
    for image in container.findAll("img"):
        if start_of_url in image['src']:
            images.append(image['src'])
            print(image['src'])
            print()
    return images

def find_description(page_soup):
    descriptions = []
    containers = page_soup.findAll("div", {"class": "search-results-content-container"})
    container = containers[0]
    all_descriptions = container.findAll("div", {"class": "card__summary"})
    for description in all_descriptions:
        descriptions.append(description.text.strip())
    return descriptions


#after user picks which recipe they want
    
def find_ingredients(page_soup):
    ingredient_names = []

    containers = page_soup.findAll("ul", {"class": "ingredients-section"})
    container = containers[0]
    ingredients = container.findAll("span", {"class": "ingredients-item-name"})

    for ingredient in ingredients:
        ingredient_names.append(ingredient.text)

    return ingredient_names

def find_directions(page_soup):
    directions = []
    containers = page_soup.findAll("ul", {"class": "instructions-section"})
    for p in containers[0].find_all("p"):
        directions.append(p.text)
    return directions

def find_title(page_soup):
    h1_tag = page_soup.find("h1")
    return h1_tag.text.strip()

def find_image_for_recipe(page_soup):
    container = page_soup.find("div", {"class": "image-container"})
    image = container.find("img")
    return image['src']

def find_description_for_recipe(page_soup):
    container = page_soup.find("div", {"class": "recipe-summary"})
    description = container.find("p")
    return description.text.strip()


found_url = find_html("https://www.allrecipes.com/recipe/166862/summer-special-shrimp-and-fruit-fried-rice/")
# find_image(found_url)
# find_description(found_url)
find_description_for_recipe(found_url)




