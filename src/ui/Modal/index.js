import React from "react";
import ReactDOM from "react-dom";
import './Modal.css';

function Modal({ children }) {
   return ReactDOM.createPortal(
      // 2 Argumentos:
      // 1. Lo que queremos renderizar
      // 2. Donde queremos renderizarlo ( independiente de la parte del DOM que se renderiza )
      <div className="ModalBackground">
         {children}
      </div>,
      document.getElementById('modal')
   );
}

export { Modal };