import axios from "axios";

export async function getPokemons() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error; 
  }
}






