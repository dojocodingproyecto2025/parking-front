import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styleinput  from "../style/inputStyle.module.css";

const RegisterPage = ({ onCloseModal }) => {
  const navigate = useNavigate();

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
    },
  });

  const createUser = async () => {
    var data = getValues();
    const validate = await trigger(["email", "password", "name", "lastName"]);

    if (data.confirmPassword !== data.password) {
      alert("El password y la confirmacion de password son diferentes");
      return;
    }

    if (!validate) {
      return;
    }
    var data = getValues();
    
    //await axios.post("http://localhost:8085/register", data);
    await axios.post("https://parking-taupe.vercel.app/register", data);
    alert("Se registro correctamente el usuario");
    // navigate("/");
    reset();
    onCloseModal();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h1>Registro</h1>
        <label>Email</label>
        <input className={styleinput.estiloinput}
          type="email"
          {...register("email", {
            required: "El Email es requerido",
            maxLength: {
              value: 100,
              message: "El email debe contener máximo 100 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.email?.message}
        </p>

        <label>Nombre</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("name", {
            required: "El Nombre es requerido",
            minLength: { value: 3, message: "Minimo de caractres es 3" },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.name?.message}
        </p>

        <label>Apellido</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("lastName", {
            required: "El Apellido es requerido",
            minLength: { value: 3, message: "Minimo de caractres es 3" },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.name?.message}
        </p>

        <label>Contraseña</label>
        <input className={styleinput.estiloinput}
          type="password"
          {...register("password", {
            required: "La Contraseña es requerido",
            minLength: { value: 8, message: "Minimo de caractres es 8" },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.password?.message}
        </p>

        <label>Contraseña</label>
        <input className={styleinput.estiloinput}
          type="password"
          {...register("confirmPassword", {
            required: "La Contraseña es requerido",
            minLength: { value: 8, message: "Minimo de caractres es 8" },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.password?.message}
        </p>

        <button className={styleinput.estiloboton} onClick={createUser}>Registrarme</button>
      </div>
    </>
  );
};
export default RegisterPage;