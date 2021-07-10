from server.functions.vision import recognize_food
import scrape
import vision

print(vision.recognize_food("./pictures/blue guys.jpg", vision.load_food_name())) 