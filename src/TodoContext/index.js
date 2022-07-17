import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props){

   const {item: todos, saveItem: saveTodos, loading, error} = useLocalStorage('TODOS_V1', []);

   const [searchValue, setSearchValue] = React.useState('');
   const [openModal, setOpenModal] = React.useState(false);
   const completedTodos = todos.filter(todo => !!todo.completed).length;
   const totalTodos = todos.length;

   let searchedTodos = [];

   if (searchValue.length > 0) {
      searchedTodos = todos.filter(todo => todo.text.toLowerCase()
      .includes(searchValue.toLowerCase()));
   }else{
      searchedTodos = todos;
   }

   const completeTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);

      const newTodos = [...todos];

      newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
      saveTodos(newTodos);
   }

   const deleteTodo = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);

      const newTodos = [...todos];

      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
   }

   const addTodo = (texto) => {
      const newTodo = {completed: false, text: texto};
      const newTodos = [...todos];
      newTodos.push(newTodo);

      saveTodos(newTodos);
   }

   return(
      <TodoContext.Provider value={{
         loading,
         error,
         completedTodos,
         totalTodos,
         searchValue,
         setSearchValue,
         searchedTodos,
         completeTodo,
         deleteTodo,
         addTodo,
         openModal,
         setOpenModal,
      }}>
         {props.children}
      </TodoContext.Provider>
   );
}

export { TodoContext, TodoProvider };