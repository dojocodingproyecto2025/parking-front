import Header from "../components/header/Headparking.jsx"
import Footer from "../components/footer/Footer.jsx";
import Hero from "../components/hero/Hero.jsx";
import Loadpage from "../components/load/Loadpage.jsx";
import ParkingSpots from "../components/parking-spots/ParkingSpots.jsx";


const PrincipalParking = () => {
    return(
        <>
            <Header/>
            <Hero/>
            <ParkingSpots/>
            <Loadpage/>
            <Footer/>
        </>
    )
}
export default PrincipalParking;