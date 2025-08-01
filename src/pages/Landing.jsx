import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Nosotros from "../components/nosotros/Nosotros";
import Servicios from "../components/servicios/Servicios"; // 1. Importa el nuevo componente
import Descarga from "../components/descarga/Descarga"; 
import './Landing.css'; // Asegúrate de tener este archivo o añade los estilos en index.css
import Footer from "../components/footer/Footer";

const Landing = () => {
    return (
        <> 
            <Header />
            <main className="page-content">
                <Main />
                <Nosotros />
                <Servicios />
                <Descarga /> 
                <Footer />
            </main>
        </>
    );
}

export default Landing;