import React from 'react';
import './hero.module.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Reserva tu Estacionamiento</h1>
        <p>Encuentra y reserva el mejor lugar para tu vehículo</p>
        <button className="cta-button">Reservar Ahora</button>
      </div>
    </div>
  );
};

export default Hero;
