import React from 'react';
import styles from './hero.module.css';

const Hero = () => {
  return (
    <div className={styles['hero-container']}>
      <div className={styles['hero-content']}>
        <h1>
          Parking App
          <br />
          Reserva tu Estacionamiento</h1>
        <p>Encuentra y reserva el mejor lugar para tu vehículo</p>
        <button className={styles['cta-button']}>Reservar Ahora</button>
      </div>
    </div>
  );
};

export default Hero;
