## Deloitte Auditor Enterprise Chat UI - HW 4

Deloitte Auditor Enterprise Chat UI - Ajax and Restful interface

This application provides a user-friendly interface for asking tax-related questions, utilizing a React frontend and a Node.js backend to query the OpenAI API for responses.
Prompts limited to only Tax related questions.

# HOW TO RUN THE APPLICATION

There are 2 parts for this application.

1. Backend - Node.js - API
   contents:

- server.js (main entry point, file contains js code to handle the conncetion with api, getting the message from frontend and also sending the response back to frontend)
- taxKeywords.json (collection of tax related kaywords as json file)
- .env (do not share!! Contains api key)

  api folder contains all the fies reuiqred to run the backend (API). OPen terminal and navigate to /api
  then execute> 'npm install' to install required node_modules.
  then execute> 'npm start'
  Now the backend is up and running locally at http://localhost:3000/

2. Frontend - React - UI
   contents:

- App.jsx (main entry point)
- ChatUI.jsx (frontend code to display the box, input text, button, and display response)
- ChatUI.CSS (CSS to support the .jsx)

  tax-prompt folder contains all the files required to run the frontend (UI). Open terminal and navigate to /tax-prompt
  then execute> 'npm install' to install required node_modules.
  After the node_modules are installed, execute> 'npm run dev'
  Now the frontend is up and running locally at http://localhost:5173/
  Open a web browser and navigate to http://localhost:5173/
  Here you will see the application.

Interact with the application and enojoy the Web Interface to prompt the appropriate Tax related question.
