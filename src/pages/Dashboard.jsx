// N.º 1: Se combinan todas las importaciones necesarias
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { authFirebase, dbFirebase } from '../firebase';
import { signOut } from 'firebase/auth';
import { getDocs, collection, query, where, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import PerfilUsuario from '../components/users/PerfilUsuario';


// Importamos los estilos del Dashboard
import './Dashboard.css';

const Dashboard = () => {
    // N.º 2: Se mantienen los hooks que ya teníamos
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [id, setId] = useState("");

    // N.º 3: Añadimos el estado para guardar la lista de tours y el hook de formulario
    const [tours, setTours] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // N.º 4: Lógica para obtener los datos de Firestore
    const handleGetTours = async () => {
    try {
        const currentUser = authFirebase.currentUser;
        if (!currentUser) return;

        const q = query(
            collection(dbFirebase, "tours"),
            where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const toursData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTours(toursData);
    } catch (error) {
        console.error("Error al obtener los tours:", error);
    }
};

    // N.º 5: Efecto para cargar los tours al montar el componente
    useEffect(() => {
    if (user) {
        handleGetTours();
    }
}, [user]);

    // N.º 6: Se mantiene la lógica para verificar el usuario autenticado
    useEffect(() => {
        const currentUser = authFirebase.currentUser;
        if (currentUser) {
            setUser(currentUser);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    // N.º 7: Se mantiene la función de Logout mejorada
    const handleLogout = async () => {
        try {
            await signOut(authFirebase);
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleEdit = (tour) => {
        setId(tour.id)
        reset({
            nombre: tour.nombre,
            imagen: tour.imagen,
            precio: tour.precio,
            descripcion: tour.descripcion
        })
    }


    // N.º 8: Lógica para crear un nuevo tour en Firestore
    const handleCreateTour = async (data) => {
        try {
            if (id) {
                if (!user) return;
                //ACtualizacion 
                await updateDoc(doc(dbFirebase, "tours", id), data)
                setId("")//Limpia el id despues de actuliza
                reset({
                    nombre: '',
                    imagen: '',
                    precio: '',
                    descripcion: ''
                })
            }
            else {
                //Creacion
                await addDoc(collection(dbFirebase, "tours"), {
                    ...data,
                    uid: user.uid,
                });

                reset()
            }
            handleGetTours()
        } catch (error) {
            console.log(error);
        }
    };

     const handleDelete = async (id) => {
        const confirmar = confirm("Vas a eliminar, ¿Estás seguro?")
        if (confirmar){
            const userDoc = doc(dbFirebase, "tours", id)
            await deleteDoc(userDoc)
            handleGetTours()
        }
    }

    return (
        // N.º 9: La estructura principal del JSX se mantiene igual
        <div className="dashboard">
            <header className="dashboard__header">
                <p className="dashboard__welcome">
                    Bienvenid@  <span>{user ? user.email : 'Usuario'}</span>
                </p>
                <div className="dashboard__actions">
                    <button onClick={handleLogout} className="dashboard__logout-btn">
                        Salir
                    </button>
                </div>
            </header>

            <main className="dashboard__content">
                <section className="user__card">
                 <PerfilUsuario />
                 </section>
                {/* === TARJETA DEL FORMULARIO === */}
                <section className="dashboard__card">
                    <h4 className="dashboard__card-title">Crear Nuevo Tour</h4>
                    <p className="dashboard__card-subtitle">Usa este módulo para añadir nuevos tours.</p>
                    
                    {/* N.º 10: Se conecta el formulario con react-hook-form y la función de crear */}
                    <form className="dashboard-form" onSubmit={handleSubmit(handleCreateTour)}>
                        <div className="campo">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Nombre del tour"
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                            />
                            {errors.nombre && <span className="errors">{errors.nombre.message}</span>}
                        </div>
                        
                        <div className="campo">
                            <label htmlFor="imagen">URL de Imagen:</label>
                            <input
                                type="url"
                                id="imagen"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                {...register("imagen", { required: "La URL de la imagen es obligatoria" })}
                            />
                            {errors.imagen && <span className="errors">{errors.imagen.message}</span>}
                        </div>
                        
                        <div className="campo">
                            <label htmlFor="precio">Precio:</label>
                            <input
                                type="number"
                                step="0.01" // Permite decimales
                                id="precio"
                                placeholder="199.99"
                                {...register("precio", { required: "El precio es obligatorio", valueAsNumber: true })}
                            />
                            {errors.precio && <span className="errors">{errors.precio.message}</span>}
                        </div>

                        <div className="campo">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                id="descripcion"
                                placeholder="Describe los detalles del tour"
                                {...register("descripcion", { required: "La descripción es obligatoria" })}
                            />
                            {errors.descripcion && <span className="errors">{errors.descripcion.message}</span>}
                        </div>

                        <input className="btn" type="submit" value="Guardar Tour" />
                    </form>
                </section>

                {/* === TARJETA DE LA LISTA DE TOURS === */}
                <section className="dashboard__card">
                    <h4 className="dashboard__card-title">Mis Tours</h4>
                    <p className="dashboard__card-subtitle">Aquí verás todos los tours que has creado.</p>

                    {/* N.º 11: Lógica para mostrar la lista o el mensaje de "no hay registros" */}
                    <div className="dashboard__tours-list">
                        {tours.length === 0 ? (
                            <div className="dashboard__no-data">
                                Aún no existen registros...
                            </div>
                        ) : (
                            tours.map((tour) => (
                                <div className="dashboard__tour-card" key={tour.id}>
                                    <img src={tour.imagen} alt={tour.nombre} className="dashboard__tour-img" />
                                    <div className="dashboard__tour-info">
                                        <h5>{tour.nombre}</h5>
                                        <p className="tour-price">${tour.precio}</p>
                                        <p>{tour.descripcion}</p>
                                    </div>
                                    <div className="dashboard__tour-actions">
                                        <button className="dashboard__tour-btn dashboard__tour-btn--update" onClick={()=>{handleEdit(tour)}}>Editar
                                            
                                        </button>
                                        <button className="dashboard__tour-btn dashboard__tour-btn--delete"  onClick={()=>{handleDelete(tour.id)}}>Borrar</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;