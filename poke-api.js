import axios from "axios";

export default async function getData() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}


async function fetchData() {
  try {
    const data = await getData();
    console.log(data);
    // Process data as needed
  } catch (error) 
  }



fetchData();
