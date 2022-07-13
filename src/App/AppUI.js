import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';

function AppUI( { totalTodos, completedTodos, searchValue, setSearchValue,
                  searchedTodos, completeTodo, deleteTodo } ){
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