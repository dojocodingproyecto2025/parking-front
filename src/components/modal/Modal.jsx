import React from "react";
import style from "./Modal.module.css"; // Opcional para estilos

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalbackdrop}>
      <div className={style.modalcontent}>
        <button className={style.modalclose} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;