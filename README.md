<div align="center">
    <img src="assets/images/logo.png" >
</div>

<h1 align="center">Captain Cook</h1>

<div align="center">

Captain Cook is a web application built with [React](https://reactjs.org/) and [Flask](https://flask.palletsprojects.com/) aimed at making home cooking easier than ever! Using [Google Cloud Vision](https://cloud.google.com/vision), users are able to take a snapshot of their ingredients and instantly find recipes. Users can _swipe_ through recipes using gesture controls, implemented using [MediaPipe](https://mediapipe.dev/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/7a19c61f-74b9-4a94-a449-fc766a3cea2e/deploy-status)](https://app.netlify.com/sites/captain-cook/deploys)

</div>

# [Devpost](https://devpost.com/software/captain-cook-3k16j2)

## Inspiration

Our inspiration for Captain Cook was our personal experiences with cooking at home as a result of the COVID-19 pandemic. With restaurants closed for most of the year, learning to cook became an essential skill for nearly everyone. However, one of the struggles with home cooking is finding recipes that match what ingredients you have. Unlike restaurants where the same ingredients are used for several dishes throughout the day, eating the same recipe several times at home is not very enjoyable. We recognized that some apps and websites accommodated this problem by allowing users to input what ingredients they had. Still, we found that they weren't very practical, given that you have to input each ingredient individually. To improve this process, we used the Google Vision API to determine what foods you have by taking a picture of your countertop or fridge.

## What it does

Captain Cook's main functionality is identifying foods by simply taking a picture and providing recipes based on what you have. Using Allrecipes.com, we can access these recipes and create a simple way for you to follow the recipe. To make this process as frictionless as possible, we included all the vital information for cooking the recipe directly into the web application by web scraping using Beautiful Soup. If the user doesn't want to scan their ingredients, they can also search for recipes using keywords like they would on the Allrecipes website.

## How we built it

The application was built using React on the frontend with material UI and python with Flask. To identify the ingredients that a user has, we used Google Vision API which passes the ingredients identified to a function that uses Beautiful Soup to web scrape recipes that match from Allrecipes. We also used Google mediapipe for hand gesture recognition and Google text-to-speech API for reading out ingredients and recipes.

## Challenges we ran into

The biggest challenge that we ran into was connecting our client with our server using socket.io for the real-time camera for the mediapipe hand motion detection. After struggling with this issue for several hours, we found that the issue was that we were connecting to the wrong domain on the client-side. As an extremely minor error in the code, we were quite frustrated that we weren't able to use the valuable time to properly implement the feature. We also had all of the functions necessary for this feature to work as well which made this an even more frustrating challenge. Despite this, we were able to overcome the issue and eventually learn how to use web sockets for the future.

## Accomplishments that we're proud of

The accomplishment that we're the proudest of is making a full-stack application with a clean user interface and implementation of extremely useful features. When we originally came up with the idea for this web application, we wanted to make something that we would be able to use in our lives. Through the creation of this app, we thought we accomplished this goal especially given the little amount of time we had. Furthermore, we are very proud that we implemented several things that we had never utilized before such as Google Vision API, Google text to speech API, socket.io and Google mediapipe for hand recognition.

## What we learned

There were a plethora of new things that we learned from this hackathon. Notably, we gained a better understanding of how to make a full stack web application through the creation of our own API, user interface using React and connecting of the client and server. For the client-side, we got a better understanding of creating a React app with different routes as well as how to properly design the interface using websites such as [framer](https://framer.com/projects/Hack-the-Cloud--u785rxEHh6o9brRP9ZnQ-WDUmE) and taskade to organize our ideas.

## What's next for Captain Cook

One of the features that we were very close to completing was the use of Google's media pipe for hand recognition to allow users to swipe between ingredients and steps without touching their device. Using TensorFlow, we trained gestures that can be used to skip, go back or repeat the step. Besides this, we were also very close to adding text to speech for reading out the directions and ingredients using the text-to-speech API. The goal of these features would be to simplify the cooking of recipes by allowing users to follow recipes more easily. We would also like to implement more features such as recognition of foods for counting calories and voice controls.
