import axios from 'axios';
import breeds from './breeds.js';

// 👉 TASK 1- Test out the following endpoints:

//  https://dog.ceo/api/breeds/image/random

//  * With Firefox! and the Network Tab
//  * With JS using the native fetch [STRETCH]


// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 
// const entryPoint = document.querySelector('.entry');


// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  // instantiating the elements
  const dogCard = document.createElement('div')
  const image = document.createElement('img')
  const heading = document.createElement('h3')
  // setting class names, attributes and text
  heading.textContent = `Breed: ${breed}`
  image.src = imageURL
  image.classList.add('dog-image')
  dogCard.classList.add('dog-card')
  // creating the hierarchy
  dogCard.appendChild(image)
  dogCard.appendChild(heading)
  // adding some interactivity
  dogCard.addEventListener('click', () => {
    dogCard.classList.toggle('selected')
  })
  // never forget to return!
  return dogCard
}


// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Projects with npm: install it with npm and import it into this file


// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console

// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)
function getDogs(breed, count) {
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
    .then(resp => {
      createDogCards(resp.data.message, '.entry', breed);
    }).catch(error => {
      console.error(error);
      const errorMsg = document.createElement('p');
      errorMsg.textContent = "AHHHHHHH";
      entryPoint.appendChild(errorMsg);
    }).finally(() => console.log("WOOOOO"))
}

function createDogCards(dogs, selector, selectedBreed) {
  for (let i = 0; i < dogs.length; i++) {
    const dogObj = {
      imageURL: dogs[i],
      breed: selectedBreed
    }
    const entryPoint = document.querySelector(selector);
    entryPoint.appendChild(dogCardMaker(dogObj));
  }
}

// getDogs('husky', 5);

// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`
const dogBtn = document.querySelector(".dog-button");
dogBtn.addEventListener('click', () => {
  document.querySelector('.entry').innerHTML = "";
  getDogs('labrador', 5);
})

// Write a function that takes in a css selector (or just selector)
// and appends 'cards' to that selector

// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// or request them from https://lambda-times-api.herokuapp.com/breeds
// and loop over them, fetching a dog at each iteration

for (let i = 0; i < breeds.length; i++) {
  getDogs(breeds[i], 3);
}