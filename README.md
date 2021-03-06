Typr
========

Typr is a full-stack web application designed for new developers to improve their typing skills. It includes Javascript, Ruby and Python typing prompts with contextual highlighting using PrismJS. Users can sign up with our Auth0 authentication in order to track user statistics. There is also a Multiplayer mode where users can race, this was implemented with socketIO. This project was built with React, Express, Node, and MongoDB.

Deployment
--------
Try our site here: https://code-typr.netlify.app/
(Please give the heroku backend a few seconds to start up, it is on the free plan)

App in Action
--------
!["Logging In"](https://github.com/CJM1994/Typr/blob/main/docs/login.png)
Logging in with Auth0

!["Python Practice"](https://github.com/CJM1994/Typr/blob/main/docs/practice_python.png)
WPM, Accuracy %, and Score appear once prompt is complete and are they are saved to mongoDB

!["Profile Page"](https://github.com/CJM1994/Typr/blob/main/docs/profile.png)
Track Improvements Over Time

!["Server Select"](https://github.com/CJM1994/Typr/blob/main/docs/server_select.png)
10 Servers to Select, will activate once 4 users have joined (this can be done from 4 windows for testing purposes)

!["Multiplayer"](https://github.com/CJM1994/Typr/blob/main/docs/multiplayer.png)
Users names will appear over their avatar in multiplayer

Features
--------

- User Authentication
- Practice Mode with Javascript, Ruby, and Python Typing Prompts
- Onscreen Keyboard as Visual Aid
- Unique Display that Highlights Errrors and Doesn't Require Backspacing
- Clean UI
- Syntax Highlighting
- User Stats and Progression
- Multiplayer Racing Mode (Websockets)
- High Scores Page

Installation
------------

If you would like to deploy locally:

    clone the project to a local folder
    run 'npm install' inside both the client folder and the server folder
    run 'npm start' in separate terminals from the server folder and then the client folder
    navigate to localhost:3000 to test the app

Contribute
----------

- Issue Tracker: https://github.com/CJM1994/Typr/issues
- Source Code: https://github.com/CJM1994/Typr

