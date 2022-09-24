import React from "react";
import { MyLoader } from '../../ui/ContentLoader';
import { useLocation, useParams } from "react-router-dom";
import { TodoForm } from '../../ui/TodoForm';
import { useTodos } from "../useTodos";

function EditTodoPage() {
   // sacar el todo enviado por el navigate
   const location = useLocation();

   //sacar el id del parametro
   const params = useParams();
   const id = Number(params.id);

   const { stateUpdaters, states } = useTodos();
   const { editTodo } = stateUpdaters;
   const { getTodo, loading } = states;

   let todoText;

   //Si entramos desde el boton de editar todo
   if (location.state?.todo) {
      todoText = location.state.todo.text;
   } else if (loading) {
      return <MyLoader />
   } else {
      const todo = getTodo(id);
      todoText = todo.text;
   }

   return (
      <>
         <TodoForm
            label={'Escribe el nuevo texto de la tarea'}
            defaultTodoText={todoText}
            submitText={'Editar'}
            submitEvent={(newText) => { editTodo(id, newText) }}
         />
      </>
   );


}

export { EditTodoPage };