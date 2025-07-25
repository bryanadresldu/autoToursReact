import { NavLink, useNavigate } from "react-router-dom";
import { authFirebase } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleLogin = async(data) => {
        const { email, password } = data;
        try {
            await signInWithEmailAndPassword(authFirebase, email, password);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert("Error al iniciar sesión: " + error.message);
        }
    }

    return (
        <main className="login-container animated-background-section">
            
            {/* =====> 1. BOTÓN PARA VOLVER AÑADIDO AQUÍ <===== */}
            <NavLink to="/" className="login-container__back-button" aria-label="Volver a la página de inicio">
                ←
            </NavLink>
            
            <div className="login-card">
                <h3 className="login-card__title">Bienvenido de Vuelta</h3>
                <p className="login-card__subtitle">Ingresa tus datos para continuar</p>

                <form onSubmit={handleSubmit(handleLogin)}>
                    
                    <div className="login-form__group">
                        <label className="login-form__label" htmlFor="email">E-mail</label>
                        <input 
                            id="email"
                            className="login-form__input"
                            type="email" 
                            placeholder="tu@email.com" 
                            {...register("email", { 
                                required: "El email es requerido",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "El formato de email no es válido"
                                }
                            })}
                        />
                        {errors.email && <span className="login-form__error">{errors.email.message}</span>}
                    </div>

                    <div className="login-form__group">
                        <label className="login-form__label" htmlFor="password">Contraseña</label>
                        <input 
                            id="password"
                            className="login-form__input"
                            type="password" 
                            placeholder="••••••••••" 
                            {...register("password", { required: "La contraseña es requerida" })}
                        />
                        {errors.password && <span className="login-form__error">{errors.password.message}</span>}
                    </div>

                    <button className="login-form__button" type="submit">Iniciar Sesión</button>
                </form>

                <NavLink to="/register" className="login-card__register-link">
                    ¿No tienes cuenta? Regístrate aquí
                </NavLink>
            </div>
        </main>
    )
}

export default Login;