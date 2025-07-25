import { useState, useEffect, useCallback } from "react";
import "./Main.css";
import lugar1 from "../../assets/imagen 1.jpg";
import lugar2 from "../../assets/imagen 2.jpg";
import lugar3 from "../../assets/imagen 3.jpg";
import lugar4 from "../../assets/imagen4.jpg";


const slideImages = [lugar1, lugar2, lugar3, lugar4];

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slideImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slideImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(goToNext, 4000);
    return () => clearTimeout(timer);
  }, [goToNext]);

  return (
      <main className="main animated-background-section">
      <div className="main__text">
        <h1>
          ¡Bienvenido a <span>AUTO-TOURS</span>!
        </h1>
        <p>
          Explora nuestros servicios, promociones exclusivas y descarga nuestra app
          para llevar la experiencia contigo a donde vayas.
        </p>
        <a href="#servicios" className="main__cta-button">
          Ver Servicios
        </a>
      </div>

      <div className="main__gallery">
        <div className="slider">
          <button onClick={goToPrevious} className="slider__arrow slider__arrow--left">
            ❮
          </button>
          <img
            key={currentIndex} 
            src={slideImages[currentIndex]}
            alt="Lugares turísticos"
            className="slider__image"
          />
          <button onClick={goToNext} className="slider__arrow slider__arrow--right">
            ❯
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;