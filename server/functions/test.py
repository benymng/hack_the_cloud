import scrape
import vision

recognized_foods = vision.recognize_food("./pictures/blue guys.jpg", vision.load_food_name()) 
url = vision.make_new_url(recognized_foods)

found_html = scrape.find_html(url)

names = scrape.find_recipe_names(found_html)
hrefs = scrape.find_href(found_html)


recipes_dict = dict.fromkeys(['name','href'])
list_of_dicts = []

for (name, link) in zip(names, hrefs):
    recipes_dict = {"name": name, "href": link}
    list_of_dicts.append(recipes_dict)

print(list_of_dicts)