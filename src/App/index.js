import React from 'react';
import { AppUI } from './AppUI';
// import './App.css';

// const defaultTodos = [
//   {text: 'Cortar cebolla', completed: true},
//   {text: 'Tomar curso de Java', completed: false},
//   {text: 'Llorar con la llorona', completed: true},
//   {text: 'Comer una pizza', completed: true},
// ];

// Custom React Hook
function useLocalStorage(itemName, initialValue) {
  //Llamamos a un React Hook que nos permite actualizar el valor de una variable
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
          //Obtener item de localStorage
        const localStorageItem = localStorage.getItem(itemName);

        //Si no hay ningun Todo guardado en localStorage, se crea un array vacio
        let parsedItem; 
        if(!localStorageItem)  {
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
        } else {
            parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  }, []);

  const saveItem = (newItem) => {
    try {
      const stringedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  }

  return {item, saveItem, loading, error};
}

function App(props) {

  const {item: todos, saveItem: saveTodos, loading, error} = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = React.useState('');
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

  // console.log('Render Antes del Use Effect');

  // React.useEffect(() => {
  //   console.log('useEffect');
  // }, [totalTodos]);

  // console.log('Render Despues del Use Effect');


  return (
    <AppUI 
      loading={loading}
      error={error}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
