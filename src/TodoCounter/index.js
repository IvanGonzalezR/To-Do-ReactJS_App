import React from 'react';
import './TodoCounter.css';

function TodoCounter({completedTodos: completed, totalTodos: total, loading}) {

   return (
      <>
         <h2 className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}>
            Has completado {completed} de {total} TODO's
         </h2>
      </>
   );
}

export { TodoCounter };