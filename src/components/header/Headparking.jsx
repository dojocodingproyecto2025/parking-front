import styles from './header.module.css'
import car from '/src/assets/img/car.svg'
import { useState } from 'react'
import { jwtDecode } from "jwt-decode";
import Modal from "../modal/Modal.jsx";
import RegisterPage from "../../pages/RegisterPage.jsx";
import Login from "../../pages/LoginPage.jsx";

function Headparking() {
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const jwt = localStorage.getItem("jwt");
    const decode = jwt? jwtDecode(jwt) : null;

  const handleModal = (isRegister = false) => {
    setIsModalRegisterOpen(false);
    setIsModalLoginOpen(false);
    if(isRegister){
      setIsModalRegisterOpen(true);
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={car} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Parking app</h1>
        </div>
        <div>
            {/* <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#2c3e50', marginBottom: '20px' }}> */}
            <h2>
            {
                decode? <p>Bienvenido {decode.name} { decode.lastName}  </p> : ""
            }
            </h2>
        </div>
        <div className={styles.right}>
          <button className={styles.btn} onClick={() => setIsModalLoginOpen(true)}>Login</button>
          <button className={styles.btn} onClick={() => setIsModalRegisterOpen(true)}>Registro</button>
        </div>
      </header>

      <Modal isOpen={isModalRegisterOpen} onClose={() => setIsModalRegisterOpen(false)}>
          <RegisterPage onCloseModal={handleModal} />
      </Modal>
      <Modal isOpen={isModalLoginOpen} onClose={() => setIsModalLoginOpen(false)}>
          <Login onCloseModal={handleModal} />
      </Modal>
    </>
  )
}

export default Headparking