import React from 'react';
import { AppUI } from './AppUI';
// import './App.css';

const defaultTodos = [
  {text: 'Cortar cebolla', completed: true},
  {text: 'Tomar curso de Java', completed: false},
  {text: 'Llorar con la llorona', completed: true},
  {text: 'Comer una pizza', completed: true},
];

function App(props) {

  const [todos, setTodos] = React.useState(defaultTodos);
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
    const todoIndex = todos.findIndex(todo => todo.text == text);

    const newTodos = [...todos];

    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    setTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);

    const newTodos = [...todos];

    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  }

  return (
    <AppUI 
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
