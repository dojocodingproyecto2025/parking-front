import React, { useState, useEffect } from "react";
import ParkingSpace from "../parking-space/ParkingSpace.jsx";
import axios from 'axios';
import style from "./ParkingSpot.module.css";
// import { io } from "socket.io-client";
import { getReservations, releaseSpot } from "../../services/reservation.js";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RBokLP3TuaeObGoAKvIAzfSJmlJRL5pqSJzcRRvHteQO9nqFlYO9AnRpVRlcJMfNrxGmmTXGV3KPv2xaC2PBmQK00FlbyoeLK');
//const url = "http://localhost:8085/api/purcharse/";
const url = "https://parking-taupe.vercel.app/api/purcharse/"
const ParkingSpots = () => {
    const [spots, setSpots] = useState([]);    
    const [error, setError] = useState(null);
    // const socket = io("https://parking-taupe.vercel.app/");

    useEffect(() => {
        const loadSpots = async () => {
            try {
                const reservations = await getReservations();
               
                
                setSpots(reservations);             
            } catch (err) {
                setError(err.message);                
            }
        };

        loadSpots();
        // sockets
        // socket.on("broadcast", (data) => {
        //     console.log(data);
        //     if(data == true){
        //         loadSpots();
        //     }
            
        // })
    }, []);

    const handleStatusChange = async (spotNumber, newStatus, formData = null) => {
        try {
            const spotIndex = spots.findIndex(s => s.spotNumber === spotNumber);
            const spot = spots[spotIndex];
            
            if (newStatus) {
                // Obtener userId de localStorage
                const jwt = localStorage.getItem('jwt');
                const userId = jwt ? JSON.parse(atob(jwt.split('.')[1])).userId : null;
                const name = jwt ? JSON.parse(atob(jwt.split('.')[1])).name : null;
                const lastName = jwt ? JSON.parse(atob(jwt.split('.')[1])).lastName : null;                
                console.log(userId,name, lastName)
                if (!userId) {
                    throw new Error('No se encontró usuario autenticado, Inicie sesión para continuar');
                }

                if (!formData?.placa) {
                    throw new Error('La placa es requerida');
                }

                try {
                    const response = await axios.post(url,{
                        name: spotNumber,
                        description: `Reserva de espacio ${spotNumber}`,
                        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAneFoUvewGOvdmGI7kfYEAkjr4tAmHMg0FQ&s"],   
                        placa: formData.placa,                  
                        price: 20
                    });
              
                    const stripe = await stripePromise;
                    const { error } = await stripe.redirectToCheckout({
                      sessionId: response.data.id,
                    });
              
                    if (error) {
                      console.error(error);
                    }
                  } catch (err) {
                    console.error(err);
                  }

                /*
                const reservationData = {
                    numeroSlot: parseInt(spotNumber.substring(1)),
                    placa: formData.placa, 
                    userId: userId
                };
                
                const newReservation = await reserveSpot(reservationData);
                
                setSpots(prevSpots => 
                    prevSpots.map(spot => 
                        spot.spotNumber === spotNumber 
                            ? { 
                                ...spot, 
                                isOccupied: true,
                                _id: newReservation._id,
                                userId: newReservation.userId,
                                placa: newReservation.placa
                              } 
                            : spot
                    )
                );*/
            } else {
                // Lógica para liberar
                if (spot._id) {
                    await releaseSpot(spot._id);
                }
                
                setSpots(prevSpots => 
                    prevSpots.map(spot => 
                        spot.spotNumber === spotNumber 
                            ? { 
                                ...spot, 
                                isOccupied: false,
                                _id: null,
                                userId: null,
                                placa: null
                              } 
                            : spot
                    )
                );
            }
            
            return true;
        } catch (error) {
            console.error("Error al cambiar estado:", error);
            throw error;
        }
    };
    
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={style.wrapper}>
            {spots.map((spot) => (
                <ParkingSpace
                    key={spot.spotNumber} 
                    spot={spot.spotNumber}
                    status={spot}
                    onStatusChange={handleStatusChange}
                />
            ))}
        </div>
    );
};

export default ParkingSpots;