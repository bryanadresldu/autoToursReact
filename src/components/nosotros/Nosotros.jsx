import React, { useState } from 'react';
import './Nosotros.css';

import imagenQuienesSomos from "../../assets/imagen 1.jpg";
import imagenVision from "../../assets/imagen 2.jpg";
import imagenMision from "../../assets/imagen 3.jpg";

const nosotrosData = {
  somos: {
    tab: '¿Quiénes somos?',
    title: '¿Quiénes somos?',
    content: 'Somos una empresa de turismo que combina movilidad segura con rutas turísticas auténticas y personalizadas, para que descubras cada destino de forma cómoda y confiable.',
    image: imagenQuienesSomos,
  },
  vision: {
    tab: 'Visión',
    title: 'Nuestra Visión',
    content: 'Ser la plataforma líder en turismo, conectando tecnología, cultura local y transporte seguro para transformar la forma en que las personas exploran nuevos lugares.',
    image: imagenVision,
  },
  mision: {
    tab: 'Misión',
    title: 'Nuestra Misión',
    content: 'Brindar recorridos únicos y accesibles, guiados por expertos locales, para ofrecer experiencias turísticas seguras, responsables y memorables.',
    image: imagenMision,
  }
};

const Nosotros = () => {
  const [activeTab, setActiveTab] = useState('somos');
  const activeContent = nosotrosData[activeTab];

  return (
    <section className="nosotros-container animated-background-section">
      <h2 className="nosotros-title">Nosotros</h2>
    
      <div className="nosotros-body">
        <div className="nosotros-content">
          <div className="nosotros-tabs">
            {Object.keys(nosotrosData).map((key) => (
              <button
                key={key}
                className={`nosotros-tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {nosotrosData[key].tab}
              </button>
            ))}
          </div>

          <div className="nosotros-info">
            <h3 className="info-title">{activeContent.title}</h3>
            <p className="info-text">{activeContent.content}</p>
          </div>
        </div>

        <div className="nosotros-image-container">
          <img 
            src={activeContent.image} 
            alt={activeContent.title} 
            className="nosotros-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default Nosotros;