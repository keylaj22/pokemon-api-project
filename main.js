import axios from "axios";

export default async function getData() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    return response.data.results; // Return the array of Pokemon objects
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function displayNames() {
  try {
    const data = await getData();

    data.forEach((pokemon) => {
      const nameElement = document.createElement('p');
      nameElement.innerHTML = pokemon.name;
      document.body.appendChild(nameElement);
    });
  } catch (error) {
    console.error('Error displaying names:', error);
  }
}

// Call the displayNames function to initiate the data fetching and display
displayNames();

