import axios from 'axios';
import { io } from "socket.io-client";

//const API_URL = 'http://localhost:8085/api/reservation';
const API_URL = "https://parking-taupe.vercel.app/api/reservation/"

export const getReservations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener reservaciones:", error);
    throw error;
  }
};

export const reserveSpot = async (spotData) => {
  try {
    const socket = io("https://parking-taupe.vercel.app");
    const response = await axios.post(API_URL, spotData);
    return response.data;
    socket.emit("message", true);
  } catch (error) {
    console.error("Error al reservar espacio:", error);
    throw error;
  }
};

export const releaseSpot = async (spotId) => {
  try {
    const response = await axios.delete(`${API_URL}/${spotId}`);
    return response.data;
  } catch (error) {
    console.error("Error al liberar espacio:", error);
    throw error;
  }
};