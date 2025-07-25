import React from 'react';
import './Servicios.css'; 
import imagenServicios from '../../assets/imagen4.jpg';

const serviciosData = [
  {
    icon: '🚗',
    title: 'Alquiler de Autos',
    description: 'Elige entre una amplia variedad de vehículos modernos y cómodos para todos tus trayectos, ya sea en la ciudad o fuera de ella.',
  },
  {
    icon: '📍',
    title: 'Localización en Tiempo Real',
    description: 'Sigue tu vehículo al instante desde tu móvil y conoce su ubicación con precisión en todo momento.',
  },
  {
    icon: '⏱️',
    title: 'Reservas Rápidas',
    description: 'Reserva en pocos clics y recibe confirmación inmediata. ¡Tu viaje comienza sin demoras!',
  },
  {
    icon: '🛠️',
    title: 'Asistencia 24/7',
    description: 'Nuestro equipo está disponible todo el día para ayudarte ante cualquier inconveniente durante tu recorrido.',
  },
];

const Servicios = () => {
  return (
    <section id="servicios" className="servicios-container animated-background-section">
      <h2 className="servicios-title">Nuestros Servicios</h2>

      <div className="servicios-content">
        <div className="servicios-list">
          {serviciosData.map((servicio, index) => (
            <div key={index} className="servicio-card">
              <h3>
                <span className="servicio-icon" role="img" aria-label="icon">{servicio.icon}</span>
                {servicio.title}
              </h3>
              <p>{servicio.description}</p>
            </div>
          ))}
        </div>

        <div className="servicios-image-container">
          <img src={imagenServicios} alt="Collage de servicios de Auto-Tours" className="servicios-image" />
        </div>
      </div>
    </section>
  );
};

export default Servicios;