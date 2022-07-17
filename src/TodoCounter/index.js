import React from 'react';
import './TodoCounter.css';
import { TodoContext } from '../TodoContext';

function TodoCounter() {

   const { completedTodos: completed,
           totalTodos: total } = React.useContext(TodoContext);

   return (
      <>
         <h2 className="TodoCounter">
            Has completado {completed} de {total} TODOs
         </h2>
      </>
   );
}

export { TodoCounter };