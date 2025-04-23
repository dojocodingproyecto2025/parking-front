import axios from "axios";
import { useForm } from "react-hook-form";
import styleinput  from "../style/inputStyle.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = ({onCloseModal, setIsModalRegisterOpen}) => {
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
    },
  });

  const createUser = async () => {
    const validate = await trigger(["email", "password"]);
    if (!validate) {
      return;
    }
    var data = getValues();
    const result = await axios.post("https://parking-taupe.vercel.app/login", data);

    if (result.data.exist == false) {
      alert("Usuario / Contraseña Incorrecto");
      return;
    }

    alert("Se logueo correctamente");
    localStorage.setItem("jwt", result.data.jwt);
    reset();
    navigate("/");
    onCloseModal();
  };

  const handleModal = () => {
    onCloseModal(true);
  }

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
        <h1>Login</h1>
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

        <label>Contraseña</label>
        <input className={styleinput.estiloinput}
          type="password"
          {...register("password", {
            required: "La Contraseña es requerido",
            maxLength: 100,
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.password?.message}
        </p>

        <button className={styleinput.estiloboton} onClick={createUser}>Entrar</button>
        <p><a href="#" onClick={() => handleModal()}>Registrate</a></p>
      </div>
    </>
  );
};
export default LoginPage;