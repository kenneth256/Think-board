import axios from "axios";



export const getDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
    return response.data;  // Return the note data
  } catch (error) {
    console.error('Error fetching note details:', error);
    throw error; 
  }
};
const baseURL = import.meta.env.MODE === "development" ? 'http://localhost:5000/api' : "/api";
const api = axios.create({
  baseURL
})

export default api;