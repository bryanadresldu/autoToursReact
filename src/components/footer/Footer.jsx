import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../footer/Footer.css";

const Footer = () => {
    useEffect(() => {
        AOS.init({
            once: true, // 
            duration: 1000, // duración del efecto
            delay: 10000 // retraso en ms
        });
    }, []);

    return (
        <footer className="container" id="contact" data-aos="fade-up">
            <div className="footer">
            <div className="footer__container">

                <div className="footer__social">
                    <h3>Síguenos en redes</h3>
                    <div className="social__icons">
                        <a href="https://www.facebook.com/?locale=es_LA"><i className="fa-brands fa-facebook"></i></a>
                        <a href="https://x.com/?lang=es"><i className="fa-brands fa-twitter"></i></a>
                        <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://www.tiktok.com/es/#"><i className="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>

                <div className="footer__links">
                    <h3>Enlaces de interés</h3>
                    <div className="links">
                        <a href="#">Soporte técnico</a>
                        <a href="#">Blog de noticias</a>
                        <a href="#">Preguntas frecuentes (FAQ)</a>
                    </div>
                </div>

                <div className="footer__contact">
                    <h3>Llámamos</h3>
                    <p className="call">(593)962985693</p>
                    <h3>Escríbenos</h3>
                    <p className="write">autotours@gmail.com</p>
                </div>
                  
            </div>
            <p class="footer__copy">© Derechos Reservados - Grupo#2</p>
            </div>
        </footer>
    );
};

export default Footer;
