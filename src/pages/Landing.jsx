import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Nosotros from "../components/nosotros/Nosotros";
import Servicios from "../components/servicios/Servicios"; // 1. Importa el nuevo componente
import Descarga from "../components/descarga/Descarga"; 
import Footer from "../components/footer/Footer";
import Catalogo from "../components/catalogo/Catalogo";


import './Landing.css';

const Landing = () => {
    return (
        <> 
            <Header />
            <main className="page-content">
                <Main />
                <Nosotros />
                <Servicios />
                <Catalogo />

                <Descarga /> 
                <Footer />
            </main>
        </>
    );
}

export default Landing;