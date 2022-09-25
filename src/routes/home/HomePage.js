import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../useTodos';
import { TodoCounter } from '../../ui/TodoCounter';
import { TodoSearch } from '../../ui/TodoSearch';
import { TodoList } from '../../ui/TodoList';
import { TodoItem } from '../../ui/TodoItem';
import { TodoHeader } from '../../ui/TodoHeader';
import { CreateTodoButton } from '../../ui/CreateTodoButton';
import { MyLoader } from '../../ui/ContentLoader';
import { ChangeAlert } from '../../ui/ChangeAlert';

function HomePage(props) {
   const navigate = useNavigate();
   //ds
   const {
      states,
      stateUpdaters,
   } = useTodos();

   const {
      completedTodos,
      error,
      loading,
      // openModal,
      searchedTodos,
      searchValue,
      totalTodos,
   } = states;

   const {
      // addTodo,
      completeTodo,
      deleteTodo,
      // setOpenModal,
      setSearchValue,
      synchronizeTodos,
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
               onSearch={(isEmpty) => {
                  if (isEmpty) {
                     navigate('/');
                  } else {
                     navigate('/search=' + searchValue,
                        {
                           state: { searchValue }
                        }
                     );
                  }
               }}
               loading={loading}
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
                  <p /><p />
                  <MyLoader />
                  <MyLoader />
                  <MyLoader />
                  <MyLoader />
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
                  key={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onEdit={() => {
                     navigate('/edit/' + todo.id,
                        {
                           state: { todo }
                        }
                     );
                  }}
               />
            )
            }
         </TodoList>

         {/* {!!openModal && (
            <Modal>
               <TodoForm
                  addTodo={addTodo}
                  setOpenModal={setOpenModal}
               />
            </Modal>
         )} */}

         <CreateTodoButton
            onClick={() => navigate('/new')}
         // setOpenModal={setOpenModal}
         // openModal={openModal}
         />

         <ChangeAlert synchronizeTodos={synchronizeTodos} />
      </>
   );
}

export { HomePage };
