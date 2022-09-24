import React from 'react';
import { useLocalStorage } from './useLocalStorage';

// const TodoContext = React.createContext();

function useTodos() {

   const {
      item: todos,
      saveItem: saveTodos,
      loading,
      error,
      synchronizeItem: synchronizeTodos
   } = useLocalStorage('TODOS_V2', []);

   const [ searchValue, setSearchValue ] = React.useState('');

   const completedTodos = todos.filter(todo => !!todo.completed).length;
   const totalTodos = todos.length;

   let searchedTodos = [];

   if (searchValue.length > 0) {
      searchedTodos = todos.filter(todo => todo.text.toLowerCase()
         .includes(searchValue.toLowerCase()));
   } else {
      searchedTodos = todos;
   }

   const completeTodo = (id) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);

      const newTodos = [ ...todos ];

      newTodos[ todoIndex ].completed = !newTodos[ todoIndex ].completed;
      saveTodos(newTodos);
   }

   const editTodo = (id, newText) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);

      const newTodos = [ ...todos ];

      newTodos[ todoIndex ].text = newText;
      saveTodos(newTodos);
   }

   const deleteTodo = (id) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);

      const newTodos = [ ...todos ];

      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos);
   }

   const addTodo = (texto) => {
      const id = newTodoId(...todos);
      const newTodo = {
         completed: false,
         text: texto,
         id: id,
      };
      const newTodos = [ ...todos ];
      newTodos.push(newTodo);

      saveTodos(newTodos);
      console.log('newTodos', newTodos);
   }

   const getTodo = (id) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      return todos[ todoIndex ];
   }

   const states = {
      completedTodos,
      error,
      loading,
      searchedTodos,
      searchValue,
      totalTodos,
      getTodo,
   };

   const stateUpdaters = {
      addTodo,
      completeTodo,
      deleteTodo,
      editTodo,
      setSearchValue,
      synchronizeTodos
   };

   return {
      states,
      stateUpdaters
   }
}

function newTodoId(...todoList) {
   //Regresar el id Mas alto + 1
   if (!todoList.length) {
      return 1;
   }
   const idList = todoList.map(todo => todo.id);
   return Math.max(...idList) + 1;
}



export { useTodos };