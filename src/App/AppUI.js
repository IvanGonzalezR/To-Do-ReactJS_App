import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';

function AppUI( { totalTodos, completedTodos, searchValue, setSearchValue,
                  searchedTodos, completeTodo, deleteTodo, loading, error } ){
   return (
      <>
      <TodoCounter 
        total = { totalTodos }
        completed = { completedTodos }
      />

      <TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {error && <p>Hubo un error...</p>}
        {loading && <p>Loading...</p>}
        {(!loading && !searchedTodos.length) && <p>Crea tu primer Todo! :D</p>}

        {
          searchedTodos.length === 0 
          ?
          <p className="TodoCounter">No hay TODOs</p> 
          :
          searchedTodos.map(todo => ( 
            <TodoItem 
              key={todo.text} 
              text={todo.text} 
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))
        }
      </TodoList>

      <CreateTodoButton />
    </>
   );
}

export { AppUI };