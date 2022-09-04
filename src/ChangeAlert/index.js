import React from "react";
import { useStorageListener } from "./useStorageListener";
import './ChangeAlert.css';

function ChangeAlert({synchronizeTodos}) {

   const { show, toggleShow } = useStorageListener(synchronizeTodos);

   if(show){
      return (
         <div className="ChangeAlert-bg">
            <div className="ChangeAlert-container">
               <p>Tus TODO's estan desactualizados...</p>
               <button 
                  className="TodoForm-button TodoForm-button--add"
                  onClick={toggleShow}
                  >
                     Actualizar
               </button>
            </div>
         </div>
      );
   }
}

export { ChangeAlert };