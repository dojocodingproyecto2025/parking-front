import axios from 'axios';

//const API_URL = 'http://localhost:8085/api/sendMail';
const API_URL = "https://parking-taupe.vercel.app/api/sendMail/"

export const sendMail = async (dataEmail) => {
  try {
    const response = await axios.post(API_URL, dataEmail);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el Email:", error);
    throw error;
  }
};