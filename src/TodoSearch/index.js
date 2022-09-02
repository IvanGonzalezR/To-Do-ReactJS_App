import React from "react";
import './TodoSearch.css';

function TodoSearch({ searchValue,
          setSearchValue, loading }) {
  
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
        disabled={loading}
      />
    </>
  );
}

export { TodoSearch };