import React from "react";
import './TodoSearch.css';
import { TodoContext } from '../TodoContext';

function TodoSearch() {

  const { searchValue,
          setSearchValue } = React.useContext(TodoContext);
  
  const onSearchValueChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  return (
    <>
      <input 
        className='TodoSearch' 
        type="text" 
        placeholder="Cebolla" 
        value={searchValue}
        onChange={ onSearchValueChange }
      />
    </>
  );
}

export { TodoSearch };