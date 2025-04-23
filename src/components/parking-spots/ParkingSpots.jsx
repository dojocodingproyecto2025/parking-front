import React from "react";
import ParkingSpace from "../parking-space/ParkingSpace.jsx";
import style from "./ParkingSpot.module.css";

const ParkingSpots = () => {
    const spots = [
        { spotNumber: "A1", isOccupied: false },
        { spotNumber: "A2", isOccupied: true },
        { spotNumber: "A3", isOccupied: false },
        { spotNumber: "A4", isOccupied: true },
        { spotNumber: "A5", isOccupied: true },
        { spotNumber: "A6", isOccupied: true },
        { spotNumber: "A7", isOccupied: true },
        { spotNumber: "A8", isOccupied: true },
        { spotNumber: "A9", isOccupied: true },
        { spotNumber: "A10", isOccupied: true },
        { spotNumber: "A11", isOccupied: true },
        { spotNumber: "A12", isOccupied: true },
        { spotNumber: "A13", isOccupied: true },
        { spotNumber: "A14", isOccupied: true },
        { spotNumber: "A15", isOccupied: true },
        { spotNumber: "A16", isOccupied: true },
        { spotNumber: "A17", isOccupied: true },
        { spotNumber: "A18", isOccupied: true },
        { spotNumber: "A19", isOccupied: true },
      ];

    return(
        <>
            <div className={style.wrapper}>
                {
                    spots.map((spot, index) => (
                        <ParkingSpace key={index} spot={spot.spotNumber} status={spot.isOccupied} />
                    ))
                }
            </div>
        </>
    )
}
export default ParkingSpots;