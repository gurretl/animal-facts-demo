// Add middleware / dependencies
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Array of animal facts to serve
let animalFacts = [
    { id: 1, fact: "A group of flamingos is called a 'flamboyance'." },
    { id: 2, fact: "Koalas sleep up to 22 hours a day." },
    { id: 3, fact: "Octopuses have three hearts and blue blood." },
    { id: 4, fact: "Dolphins have names for each other." },
    { id: 5, fact: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible." },
    { id: 6, fact: "A snail can sleep for three years at a time." }
];

// Enabling CORS for all requests
app.use(cors());

// Enabling body parser middleware to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the root entry point for the REST API
app.get('/', (req, res) => {
  res.send('Welcome to the Animal Facts REST API. Visit /animalfacts to see the list.');
});

// Define a route to retrieve all animal facts
app.get('/animalfacts', (req, res) => {
    res.send(animalFacts);
});

// Define a route to retrieve a random animal fact
app.get('/randomfact', (req, res) => {
    const fact = animalFacts[Math.floor(Math.random() * animalFacts.length)];
    res.send(fact);
});

// Define a route to add a new animal fact
app.post('/animalfacts', (req, res) => {
  // Generate a new ID for the animal fact
  const newId = animalFacts[animalFacts.length - 1].id + 1;

  // Get the fact from the request body
  const fact = req.body.fact;

  // Output the fact to the console for debugging
  console.log({ id: newId, fact: fact });
  animalFacts.push({ id: newId, fact: fact });

  // res.send('A new animal fact has been added to the array.');
  res.send({ id: newId, fact: fact });
});

// Define a route to delete an animal fact
app.delete('/animalfacts/:id', (req, res) => {
    // Get the animal fact ID from the request parameters
    const factId = req.params.id;
    
    // Find the animal fact with the matching ID
    const factIndex = animalFacts.findIndex(fact => fact.id == factId);
    
    // Remove the animal fact from the array
    animalFacts.splice(factIndex, 1);
    
    // Send a message as a response
    res.send({ message: "Animal fact deleted successfully" });
});

// Start the REST API Server
app.listen(port, () => console.log(`Animal Facts API listening on port ${port}!`));

//Starts the nodemon tool from the dev script defined in the project’s package.json file
// npm run dev
