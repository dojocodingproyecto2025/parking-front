import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { reserveSpot } from "../services/reservation";
import { sendMail } from "../services/email";
import { FaCheckCircle, FaCar, FaSpinner } from 'react-icons/fa';
import styles from "./success.module.css"; // Importación del módulo CSS

const Success = () => {
    const [searchParams] = useSearchParams();
    const data = searchParams.get('data');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const processReservation = async () => {
            try {
                if (data) {
                    setLoading(true);
                    setError(null);
                    
                    const jwt = localStorage.getItem('jwt');
                    const userId = jwt ? JSON.parse(atob(jwt.split('.')[1])).userId : null;        
                    const name = jwt ? JSON.parse(atob(jwt.split('.')[1])).name : null;
                    const lastName = jwt ? JSON.parse(atob(jwt.split('.')[1])).lastName : null;      
                    
                    if (!userId) {
                        throw new Error('No se encontró usuario autenticado. Inicie sesión para continuar');
                    }

                    const [placa, numeroSlot] = data.split('|');

                    const reservationData = {
                        numeroSlot: numeroSlot,
                        placa: placa,
                        userId: userId
                    };

                    await reserveSpot(reservationData);  
                    
                    const dataEmail = {
                        to: "prueba@gmail.com",
                        message: "Gracias por reservar con nosotros",
                        name: `${name} ${lastName}`,
                        producto: {
                            nSlot: numeroSlot,
                            precio: "20.00"
                        },
                        id: userId
                    };
                    
                    await sendMail(dataEmail);
                    
                    setSuccess(true);
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message || 'Ocurrió un error al procesar tu reserva');
            } finally {
                setLoading(false);
            }
        };

        processReservation();
    }, [data]);

    if (loading) {
        return (
            <div className={styles.showAlert}>
            <div className={styles.successContainer}>
                <div className={styles.loadingAnimation}>
                    <FaSpinner className={styles.spinner} />
                    <FaCar className={styles.car} />
                </div>
                <h2>Procesando tu reserva...</h2>
                <p>Estamos guardando tu espacio de estacionamiento</p>
            </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.successContainer} ${styles.error}`}>
                <div className={styles.errorIcon}>⚠️</div>
                <h2>Algo salió mal</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.successContainer}>
            <div className={styles.successAnimation}>
                <FaCheckCircle className={styles.checkIcon} />
                <div className={styles.parkingSpot}>
                    <FaCar className={styles.parkedCar} />
                    <div className={styles.spotNumber}>{data.split('|')[1]}</div>
                </div>
            </div>
            <h1>¡Reserva confirmada!</h1>
            <div className={styles.reservationDetails}>
                <p><strong>Vehículo:</strong> {data.split('|')[0]}</p>
                <p><strong>Espacio:</strong> {data.split('|')[1]}</p>
                <p><strong>Total pagado:</strong> $20.00</p>
            </div>
            <p className={styles.confirmationMessage}>
                Hemos enviado un correo con los detalles de tu reserva.
                Presenta este número al llegar al estacionamiento.
            </p>
        </div>
    );
};

export default Success;