import React, { useState } from "react";
import Header from "../components/header/Headparking.jsx"
import Footer from "../components/footer/Footer.jsx";
import Hero from "../components/hero/Hero.jsx";
import ParkingSpots from "../components/parking-spots/ParkingSpots.jsx";
import Modal from "../components/modal/Modal.jsx";
import RegisterPage from "./RegisterPage.jsx";
import Login from "./LoginPage.jsx";

const PrincipalParking = () => {
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

    const handleReserve = (spotNumber) => {
        setIsModalRegisterOpen(false);
        setIsModalLoginOpen(false);
    }
    return(
        <>
            <Header/>
            <Hero/>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button onClick={() => setIsModalRegisterOpen(true)}>Registro</button>
                <button onClick={() => setIsModalLoginOpen(true)}>Login</button>
            </div>
            <ParkingSpots/>
            <Footer/>

            <Modal isOpen={isModalRegisterOpen} onClose={() => setIsModalRegisterOpen(false)}>
                <RegisterPage onCloseModal={handleReserve} />
            </Modal>
            <Modal isOpen={isModalLoginOpen} onClose={() => setIsModalLoginOpen(false)}>
                <Login onCloseModal={handleReserve} />
            </Modal>
        </>

    )
}
export default PrincipalParking;