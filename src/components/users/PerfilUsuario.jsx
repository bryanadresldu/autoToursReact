import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authFirebase, dbFirebase } from "../../firebase";
import "./PerfilUsuario.css";

const PerfilUsuario = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [urlAuto, setUrlAuto] = useState("");
  const [urlConductor, setUrlConductor] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const user = authFirebase.currentUser;
        if (!user) return;

        setCorreo(user.email);
        const nombreFirebase = user.displayName || "";

        const docRefConductor = doc(dbFirebase, "conductores", user.uid);
        const docSnapConductor = await getDoc(docRefConductor);

        if (docSnapConductor.exists()) {
          const data = docSnapConductor.data();
          setValue("nombre", data.nombre);
          setValue("telefono", data.telefono);
          setValue("modelo", data.modelo);
          setValue("placa", data.placa);
          setValue("fotoAutoUrl", data.fotoAuto || "");
          setValue("fotoConductorUrl", data.fotoConductor || "");
          setUrlAuto(data.fotoAuto || "");
          setUrlConductor(data.fotoConductor || "");
          setNombre(data.nombre || nombreFirebase);
          setTelefono(data.telefono || "");
        } else {
          const docRefUser = doc(dbFirebase, "Users", user.uid);
          const docSnapUser = await getDoc(docRefUser);

          if (docSnapUser.exists()) {
            const userData = docSnapUser.data();
            setValue("nombre", userData.name || nombreFirebase);
            setValue("telefono", userData.telefono || "");
            setNombre(userData.name || nombreFirebase);
            setTelefono(userData.telefono || "");
          } else {
            setValue("nombre", nombreFirebase);
            setNombre(nombreFirebase);
          }
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error.message);
      }
    };

    fetchPerfil();
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = authFirebase.currentUser;
      if (!user) throw new Error("Usuario no autenticado");

      await setDoc(doc(dbFirebase, "conductores", user.uid), {
        nombre: data.nombre,
        telefono: data.telefono,
        modelo: data.modelo,
        placa: data.placa,
        fotoAuto: data.fotoAutoUrl?.trim() || "",
        fotoConductor: data.fotoConductorUrl?.trim() || ""
      });

      setNombre(data.nombre);
      setTelefono(data.telefono);
      setUrlAuto(data.fotoAutoUrl?.trim() || "");
      setUrlConductor(data.fotoConductorUrl?.trim() || "");

      alert("Perfil actualizado correctamente.");
    } catch (error) {
      alert("Error al guardar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perfil-contenedor">
      <h2 className="perfil-titulo">Perfil del Conductor</h2>
      {nombre && <p className="perfil-correo">Nombre: {nombre}</p>}
      {correo && <p className="perfil-correo">Correo: {correo}</p>}
      {telefono && <p className="perfil-correo">Teléfono: {telefono}</p>}

      <form className="perfil-formulario" onSubmit={handleSubmit(onSubmit)}>

        <label>Nombre completo:</label>
        <input {...register("nombre", { required: true })} />
        {errors.nombre && <span className="error">* Nombre requerido</span>}

        <label>Teléfono:</label>
        <input
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Número inválido (10 dígitos)"
            }
          })}
        />
        {errors.telefono && <span className="error">{errors.telefono.message}</span>}

        <label>Modelo del auto:</label>
        <input {...register("modelo", { required: true })} placeholder="Modelo del auto" />
        {errors.modelo && <span className="error">* Modelo requerido</span>}

        <label>Placa del auto:</label>
        <input {...register("placa", { required: true })} placeholder="Placa del auto" />
        {errors.placa && <span className="error">* Placa requerida</span>}

        <label>URL Foto del auto:</label>
        <input
          type="url"
          placeholder="Ingrese URL de la foto del auto"
          {...register("fotoAutoUrl")}
        />

        <label>URL Foto del conductor:</label>
        <input
          type="url"
          placeholder="Ingrese URL de la foto del conductor"
          {...register("fotoConductorUrl")}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Perfil"}
        </button>
      </form>

      {(urlConductor || urlAuto) && (
        <div className="perfil-preview">
          <h3>{nombre}</h3>
          {urlConductor && <img src={urlConductor} alt="Foto del conductor" className="foto-preview" />}
          {urlAuto && <img src={urlAuto} alt="Foto del auto" className="foto-preview" />}
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
