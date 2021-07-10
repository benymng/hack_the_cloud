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



