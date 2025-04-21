import style from "./ParkingSpace.module.css"

const ParkingSpace = ({ spot, status }) => {

    const parkingspotavailable = `${style.parkingspot} ${style.available}`;
    const parkingspotoccupied = `${style.parkingspot} ${style.occupied}`;

    return(
        <>
            <button disabled={!status}>
                <div className={ status? parkingspotavailable : parkingspotoccupied } >
                    <div className={style.spotnumber}>{spot}</div>
                </div>
            </button>
        </>
    )
}
export default ParkingSpace;
