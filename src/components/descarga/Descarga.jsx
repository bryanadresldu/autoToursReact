import React from 'react';
import './Descarga.css';

import phoneImage from '../../assets/Phone.jpg';
import appStoreImage from '../../assets/appstore.png';
import googlePlayImage from '../../assets/googleplay.png';

const featuresData = [
  "Lleva el volante en tu bolsillo con una interfaz intuitiva.",
  "Reserva, gestiona y localiza tus rutas favoritas en segundos.",
  "Recibe notificaciones y ofertas exclusivas en tiempo real."
];

const Descarga = () => {
  return (
    <section id="descarga" className="descarga-container animated-background-section">
      <div className="descarga-content">
        <div className="descarga-text-column">
          <h2 className="descarga-title">
            Tu Aventura, Ahora en Tu Bolsillo
          </h2>
          <p className="descarga-subtitle">
            Descarga nuestra aplicación y toma el control total de tus viajes.
            La mejor experiencia de AUTO-TOURS, al alcance de tu mano.
          </p>
          
          <ul className="descarga-features-list">
            {featuresData.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <div className="descarga-buttons">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Descargar en la App Store">
              <img src={appStoreImage} alt="Botón de App Store" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Descargar en Google Play">
              <img src={googlePlayImage} alt="Botón de Google Play" />
            </a>
          </div>
        </div>

        <div className="descarga-image-column">
          <img src={phoneImage} alt="Aplicación móvil de AUTO-TOURS en un teléfono" className="descarga-phone-image" />
        </div>

      </div>
    </section>
  );
};

export default Descarga;