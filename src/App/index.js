import React from 'react';
import { useTodos } from './useTodos';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodoHeader } from '../TodoHeader';
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';
import { MyLoader } from '../ContentLoader';
import { ChangeAlert } from '../ChangeAlert';
import './App.css';



function App(props) {

  const {
    states,
    stateUpdaters,
  } = useTodos();

  const {
    error, 
    loading, 
    searchedTodos, 
    totalTodos,
    completedTodos,
    completeTodo,
    openModal,
    searchValue,
  } = states;

  const {
    deleteTodo,   
    setOpenModal,
    setSearchValue,
    addTodo, 
    synchronizeTodos
  } = stateUpdaters;

  return (
    <>
      <TodoHeader loading={loading}>
        <TodoCounter 
          totalTodos={totalTodos} 
          completedTodos={completedTodos}
          // loading={loading}
        />

        <TodoSearch 
          searchValue={searchValue} 
          setSearchValue={setSearchValue}
          // loading={loading}
        />
      </TodoHeader>

      <TodoList 
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchText={searchValue}
        onError={() => <p>Hubo un error...</p>}
        onLoading={() => 
          <>
              <p/><p/>
              <MyLoader/> 
              <MyLoader/> 
              <MyLoader/>
              <MyLoader/>
          </>
        }
        onEmptyTodos={() => <p>Crea tu primer TODO</p>}
        onEmptySearchResults={(searchText) => <p>No hay resultados para {searchText}</p>}
        // {/* Render Function */}
        // render={todo => ( 
        //     <TodoItem 
        //       key={todo.text} 
        //       text={todo.text} 
        //       completed={todo.completed}
        //       onComplete={() => completeTodo(todo.text)}
        //       onDelete={() => deleteTodo(todo.text)}
        //     />
        //   )
        // }
      >
        {/* Render Function (children)*/}
        {todo => ( 
            <TodoItem 
              key={todo.text} 
              text={todo.text} 
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          )
        }
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}/>
        </Modal>
      )}

      <CreateTodoButton 
        setOpenModal={setOpenModal}
        openModal={openModal}
      />

      <ChangeAlert synchronizeTodos={synchronizeTodos}/>
    </>
   );
}

export default App;
