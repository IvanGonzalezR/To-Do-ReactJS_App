import React from 'react';
import './TodoItem.css';


function TodoItem(props) {

   return (
      <>
         <li className='TodoItem'>
            <span // Boton de completar
               className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
               onClick={props.onComplete}
            >
               {
                  props.completed ?
                     <img src="https://i.imgur.com/9JF3a4I.png" title="checked" />
                     :
                     <img src="https://i.imgur.com/bBRJdkN.png" title="not-checked" />
               }
            </span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
               {props.text}
            </p>
            <span // Boton de editar
               className='Icon Icon-edit'
               onClick={props.onEdit}
            >
               {/* Imagen de editar el To-do */}
               <img src="https://imgur.com/EPHscPB.png" title="edit" id='edit' />
            </span>
            <span // Boton de eliminar
               className='Icon Icon-delete'
               onClick={props.onDelete}
            >
               {/* Imagen de eliminar el To-do */}
               <img src="https://i.imgur.com/KZDkUpZ.png" title="delete" id='delete' />
            </span>
         </li>
      </>
   )
}

export { TodoItem };