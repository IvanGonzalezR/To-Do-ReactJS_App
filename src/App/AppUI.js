import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoContext } from '../TodoContext';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';

function AppUI(){

  const {   error, 
            loading, 
            searchedTodos, 
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        } = React.useContext(TodoContext);

   return (
      <>
      <TodoCounter/>

      <TodoSearch />

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

      {!!openModal && (
        <Modal>
        <p>{searchedTodos[0]?.text}</p>
        </Modal>
      )}

      <CreateTodoButton 
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </>
   );
}

export { AppUI };