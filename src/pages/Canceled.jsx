import React from 'react';
import style from './canceled.module.css';
import swal from 'sweetalert2';
import { useEffect } from 'react';



function Canceled() {

  useEffect(() => {
    showAlert();
  }, []);

  const showAlert=()=>{
    swal.fire({
      icon: 'error',
      title: 'Pago Cancelado',
      text: 'Estas saliendo de la pasarela de pago',
      animation: true,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      background: '#3f3b3b',
      color: '#ffffff',
      confirmButtonColor: '#4CAF50',
    });
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>¡Pago Cancelado!</h1>
        <p>Estas saliendo de la pasarela de pago</p>
      </div>
    </div>
  );
}

export default Canceled;