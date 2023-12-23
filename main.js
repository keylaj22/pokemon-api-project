import { getPokemons } from '/poke-api-calls.js';
import axios from "axios";
//this variable is global variable because I need to use it in two functions filterByHeightOfPokemons and filterByWeightOfPokemons
let newArrayOfPokeData;



//this function is fetching the data of the api request for the 10 pokemons, and displaying it on the console and the page,and requesting the data of the weight and height filetered arrays of pokemons and doing the same.
async function fetchData() {
  try {
    const pokeData = await getPokemons();
    const pokeArray = pokeData.results;

    const arrayOfPromises = pokeArray.map(async (pokemonObj) => {
      try {
        const response = await axios.get(pokemonObj.url);
        const pokemonData = response.data;
        console.log(`Data for ${pokemonObj.name}:`, pokemonData);
        return pokemonData;
      } catch (error) {
        console.error(`Error fetching data for ${pokemonObj.name}:`, error);
        throw error;
      }
    });

    newArrayOfPokeData = await Promise.all(arrayOfPromises);
    console.log(newArrayOfPokeData);

    const { heavy, light } = filterbyWeightOfPokemons();
    console.log("Heavy Pokémons:", heavy);
    console.log("Light Pokémons:", light);

    const { tall, short } = filterbyHeightOfPokemons();
    console.log("Tall Pokémons:", tall);
    console.log("Short Pokémons:", short);

   
    displayNamesWithImages(newArrayOfPokeData);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}
//this function is filtering the weight of pokemons of the newArrayofPokeData that I created using 10 pokemons, is filtering and dividing them by their weight choices of heavy and light
function filterbyWeightOfPokemons() {
  if (!newArrayOfPokeData) {
    console.error('Pokémon data not available. Call fetchData first.');
    return {};
  }

  const heavyPokemons = newArrayOfPokeData.filter((pokemonObj) => pokemonObj.weight >= 200);
  const lightPokemons = newArrayOfPokeData.filter((pokemonObj) => pokemonObj.weight <= 200);

  const allPokemons = newArrayOfPokeData; 

  return {
    heavy: heavyPokemons,
    light: lightPokemons,
    all: allPokemons,
  };
}
//this function is filtering the new arrayOfPokeData of the 10 pokemons and categorizing this array in a new array of  tall and short categories
function filterbyHeightOfPokemons() {
  if (!newArrayOfPokeData) {
    console.error('Pokémon data not available. Call fetchData first.');
    return {};
  }

  const tallPokemons = newArrayOfPokeData.filter((pokemonObj) => pokemonObj.height >= 7);
  const shortPokemons = newArrayOfPokeData.filter((pokemonObj) => pokemonObj.height <= 7);

  const allPokemons = newArrayOfPokeData; 

  return {
    tall: tallPokemons,
    short: shortPokemons,
    all: allPokemons,
  };
}
//this function is getting the pokemon image front_default sprite image from the API
async function getPokemonImage(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data.sprites.front_default;
  } catch (error) {
    console.error(`Error fetching image for ${pokemonName}:`, error);
    throw error;
  }
}




document.getElementById('lightButton').addEventListener('click', function () {
  const { light } = filterbyWeightOfPokemons();
  displayNamesWithImages(light);
});
document.getElementById('heavyButton').addEventListener('click', function () {
  const { heavy } = filterbyWeightOfPokemons();
  displayNamesWithImages(heavy);
});

document.getElementById('tallButton').addEventListener('click', function () {
  const { tall } = filterbyHeightOfPokemons();
  displayNamesWithImages(tall);
});
document.getElementById('shortButton').addEventListener('click', function () {
  const { short } = filterbyHeightOfPokemons();
  displayNamesWithImages(short);
});
document.getElementById('showall').addEventListener('click', function () {
  const { all } = filterbyWeightOfPokemons();

 
  if (all) {
   
    displayNamesWithImages(all);
  } else {
    console.error('Invalid or undefined "all" array:', all);
  }
});


//this function's job is to display the names and the images of the 10 pokemon array.
function displayNamesWithImages(pokemonArray) {
  try {
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = ''; 

   
    if (pokemonArray && Array.isArray(pokemonArray)) {

     
      const promises = pokemonArray.map(async (pokemon) => {
        const imageUrl = await getPokemonImage(pokemon.name);

        const cardElement = document.createElement('div');
        cardElement.classList.add('pokemon-card');



        const containerElement = document.createElement('div');
        containerElement.classList.add('pokemon-container');

        const nameElement = document.createElement('p');
        nameElement.innerHTML = pokemon.name;
        nameElement.classList.add('bold-uppercase');

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('pokemon-image');

        containerElement.appendChild(nameElement);
        containerElement.appendChild(imageElement);
        cardElement.appendChild(containerElement); 
        pokemonContainer.appendChild(cardElement);
        
      });

     
      Promise.all(promises).catch((error) => {
        console.error('Error displaying names with images:', error);
      });
    } else {
      console.error('Invalid or undefined pokemonArray:', pokemonArray);
    }
  } catch (error) {
    console.error('Error displaying names with images:', error);
  }
 
  
 

}
fetchData();





























