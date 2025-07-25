import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFirebase, dbFirebase } from "../firebase.js";
import { setDoc, doc } from 'firebase/firestore';
import { useForm } from "react-hook-form";
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = async (data) => {
        const { email, password, name } = data;
        try {
            const userCredential = await createUserWithEmailAndPassword(authFirebase, email, password);
            const user = userCredential.user;

            if (user) {
                await setDoc(doc(dbFirebase, "Users", user.uid), {
                    email: user.email,
                    name: name, // Usamos el nombre del formulario
                    rol: "user" // Es buena práctica asignar un rol por defecto
                });
            }
            navigate("/login"); // Redirige al login tras un registro exitoso
        } catch (error) {
            console.error("Error en el registro:", error.message);
            // Muestra un error más específico y amigable
            alert("Error al registrarse: " + error.message);
        }
    };

    return (
        // 2. Aplica las clases para el contenedor y el fondo animado
        <main className="register-container animated-background-section">
            
            {/* 3. Usa la nueva tarjeta de registro */}
            <div className="register-card">
                <h3 className="register-card__title">Crea tu Cuenta</h3>
                <p className="register-card__subtitle">Es rápido y fácil.</p>

                <form onSubmit={handleSubmit(handleRegister)}>
                    
                    {/* 4. Grupos de formulario mejorados */}
                    <div className="register-form__group">
                        <label className="register-form__label" htmlFor="name">Nombre Completo</label>
                        <input
                            id="name"
                            className="register-form__input"
                            type="text"
                            placeholder="Ej: Juan Pérez"
                            {...register("name", { required: "El nombre es obligatorio" })}
                        />
                        {errors.name && <span className="register-form__error">{errors.name.message}</span>}
                    </div>

                    <div className="register-form__group">
                        <label className="register-form__label" htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            className="register-form__input"
                            type="email"
                            placeholder="tu@email.com"
                            {...register("email", { 
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "El formato del correo no es válido"
                                }
                            })}
                        />
                        {errors.email && <span className="register-form__error">{errors.email.message}</span>}
                    </div>

                    <div className="register-form__group">
                        <label className="register-form__label" htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            className="register-form__input"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            {...register("password", { 
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres"
                                }
                            })}
                        />
                        {errors.password && <span className="register-form__error">{errors.password.message}</span>}
                    </div>

                    <button className="register-form__button" type="submit">Crear Cuenta</button>
                </form>

                <NavLink to="/login" className="register-card__login-link">
                    ¿Ya tienes una cuenta? Inicia sesión
                </NavLink>
            </div>
        </main>
    );
}

export default Register;