import Swal from 'sweetalert2';
import style from "./ParkingSpace.module.css";

const ParkingSpace = ({ spot, status, onStatusChange }) => {
    const handleClick = async () => {
        if (status?.isOccupied) {
            // Liberar espacio
            const { isConfirmed } = await Swal.fire({
                title: 'Liberar espacio',
                html: `¿Está seguro de liberar el espacio ${spot}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, liberar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
            });
            
            if (isConfirmed) {
                try {
                    await onStatusChange(spot, false);
                    Swal.fire({
                        title: '¡Liberado!',
                        text: `Espacio ${spot} liberado con éxito`,
                        icon: 'success',
                        timer: 2000
                    });
                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        } else {
            // Reservar espacio - con formulario para placa
            const { value: formValues, isConfirmed } = await Swal.fire({
                title: `Reservar espacio ${spot}`,
                html: `
                    <input id="placa" class="swal2-input" 
                           placeholder="Ingrese la placa del vehículo" 
                           required 
                           pattern="[A-Za-z0-9-]{4,10}"
                           title="Placa debe tener entre 4-10 caracteres alfanuméricos">
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Reservar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    return {
                        placa: document.getElementById('placa').value.trim()
                    };
                }
            });
            
            if (isConfirmed) {
                try {
                    await onStatusChange(spot, true, formValues);
                    Swal.fire({
                        title: '¡Reservado!',
                        text: `Espacio ${spot} reservado para placa ${formValues.placa}`,
                        icon: 'success',
                        timer: 2000
                    });
                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        }
    };

    return (
        <button
            className={style.spotButton}
            onClick={handleClick}
            aria-label={`Espacio ${spot} - ${status?.isOccupied ? "Ocupado" : "Disponible"}`}
        >
            <div className={`${style.parkingspot} ${
                status?.isOccupied ? style.occupied : style.available
            }`}>
                <span className={style.spotLetter}>{spot.match(/[A-Z]+/)?.[0]}</span>
                <span className={style.spotNumber}>{spot.match(/\d+/)?.[0]}</span>                
            </div>
        </button>
    );
};

export default ParkingSpace;
