# Reaktor Rock-Paper-Scissors results

My solution to Reaktor's 2022 summer job pre-assignment. You can view the application at [Heroku](https://reaktor-rps.herokuapp.com/).
Short version of assignment description is given below.

> Your task is to implement a web application that displays rock-paper-scissors match results.  
The web application must display the games as they are in progress, and you must also be able to look at historical results of individual players.  
In addition, the currently ongoing games must be visible at all times.
<br>

## About the application
<br>

The application processes Rock-Paper-Scissors game results. Results are retrieved from two external endpoints running at *https://bad-api-assignment.reaktor.com*:
<br>

- A live-result websocket running at **/rps/live**
- A historical API running at **/rps/history**

<br>
Historical results are retrieved as pages of completed games.
<br>
The application shows currently ongoing games live for the user.
The user can also view any players historical games and statistics.
<br>
<br>

# Stack
<br>

## **Frontend**
- Frontend is made with **React**, using Typescipt. Project was created using Create-React-App. It consists of:
    - A live-game section, where currently ongoing games are retrieved from the Express backend through a websocket connection.
    - Historical data section, where user can choose a player and view their historical statistics and games. Data is fetched from the Express backend.

## **Backend**
- Backend is made with **Express** / **Node** using Typescipt. It consists of
    - Fetching live games from an external websocket.
    - Fetching historical game results from an external API.
    - Providing an API for the frontend, including a route for fetching individual players' statistics and games.
    - Passing live games to the frontend through a websocket connection.

## **MongoDb cache**
- A document database acting as a cache / db for storing players' data and historical games

It is needed because:
- The external endpoint **/rps/history** is quite slow, and processing the necessary pages of data to retrieve a certain players historical games simply using the external API would be slow.
- Pre-processing the games in a desirable format and then retrieving the necessary data from a db makes the process much faster and cleaner.
- There is quite a bit of data (~few hundred Mb) and storing this all in an in-memory cache is not desirable.


