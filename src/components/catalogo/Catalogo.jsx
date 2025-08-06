import { useEffect, useState } from 'react';
import { obtenerTours } from '../../utils/firebaseUtils';

import "../catalogo/Catalogo.css";


const Catalogo = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const cargarTours = async () => {
      const datos = await obtenerTours();
      setTours(datos);
    };
    cargarTours();
  }, []);

  return (
    <div className="landing">
      <h1 className="landing__titulo">Publicaciones recientes en AutoTours</h1>
      <h2 className="landing__subtitulo">Explora nuestras rutas turísticas</h2>

      <div className="landing__tours-list">
        {tours.length === 0 ? (
          <p className="landing__sin-tours">No hay tours disponibles.</p>
        ) : (
          tours.map(tour => (
            <div className="landing__tour-card" key={tour.id}>
              <img src={tour.imagen} alt={tour.nombre} className="landing__tour-img" />
              <div className="landing__tour-info">
                <h3>{tour.nombre}</h3>
                <p><strong>Precio:</strong> ${tour.precio}</p>
                <p>{tour.descripcion}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Catalogo;

