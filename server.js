// Seting up an empty JS object to act as endpoint for all routes
let projectData = {};

// Requiring Express to run server and routes
const express = require('express');

// Starting up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Requiring Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log('The server is running...');
    console.log(`Running on localhost: ${PORT}`);
});

app.get('/data', function (req,res) {
    res.send(projectData)
})

app.post('/add', function (req, res) {
    let newData = req.body;
    let newReception = {
       temperature: newData.temperature,
       date: newData.date,
       userResponse: newData.userResponse
    };
    
    projectData = newReception;
    res.send(projectData);
    console.log(projectData);
});