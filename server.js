/////////////////////////////////////////////////

// Server file for the Weather Journal App /////

////////////////////////////////////////////////


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// using body-parser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, startServer);

function startServer() {
    console.log(`Server is running at port ${port}`);
};


// Adding a GET route that returns the "projectData" object
app.get('/all', (req, res) => {
    res.send(projectData);
    // NOTE: Adding the next line of code => to empty the "projectData" array every time!
    projectData = [];

});


// Adding a POST route that adds incoming data to "projectData"
app.post('/addNewData', addIncomingData);

function addIncomingData(req, res) {
    // NOTE: Here POST method dealing with "body heading"! 
    console.log(req.body);
    
    // newInfo = {
    //     date: req.body.date,
    //     temp: req.body.temp,
    //     content: req.body.content
    // }

    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;

    res.send(projectData);
};
