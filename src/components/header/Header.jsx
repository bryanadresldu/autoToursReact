import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="container__menu">
      <div className="logo">
        <img src={logo} alt="AUTO-TOURS Logo" />
      </div>

      <nav className="container__nav">
      <ScrollLink to="main" smooth={true} duration={500} offset={-70} className="btn-primary">Inicio</ScrollLink>
      <ScrollLink to="nosotros-container" smooth={true} duration={500} offset={-70} className="btn-primary">Nosotros</ScrollLink>
      <ScrollLink to="servicios-content" smooth={true} duration={500} offset={-70} className="btn-primary">Servicios</ScrollLink>
      <ScrollLink to="descarga-content" smooth={true} duration={500} offset={-70} className="btn-primary">Descargar App</ScrollLink>
        <NavLink to="/" className="btn-primary">Galería</NavLink>
        <NavLink to="/" className="btn-primary">Contacto</NavLink>
      </nav>
      <nav className="login">
        <NavLink to="/" className="btn-primary">Ayuda</NavLink>
        <NavLink to="/login" className="btn-primary">Acceso</NavLink>
      </nav>
    </header>
  );
};

export default Header;
