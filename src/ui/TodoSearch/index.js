import React from "react";
import { useParams } from "react-router-dom";
import './TodoSearch.css';

function TodoSearch({ searchValue,
  setSearchValue, loading, onSearch }) {

  const [ firstTime, setFirstTime ] = React.useState(true);
  //sacar el searchValue d el parametro de la url
  const params = useParams();
  const searchValueFromUrl = params.searchValue;

  React.useEffect(() => {
    if (!!searchValueFromUrl) {
      setSearchValue(searchValueFromUrl);
    }
  }, []);

  const onSearchValueChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  const onSearchBtnClick = () => {
    if (firstTime && !searchValueFromUrl && searchValue > 0) {
      onSearch();
      setFirstTime(false);
    } else if ((!searchValueFromUrl && !firstTime) || searchValue.length === 0) {
      onSearch(true);
    } else {
      setSearchValue(searchValue);
      onSearch();
    }
  }

  return (
    <>
      <div className='TodoSearch-div'>
        <input
          className='TodoSearch'
          type="text"
          placeholder="Cebolla"
          value={searchValue}
          onChange={onSearchValueChange}
          disabled={loading}
        />
        <span>
          <button
            className='TodoSearch-button'
            onClick={onSearchBtnClick}
            disabled={loading}
          >
            <img src="https://imgur.com/TivoObk.png" title="edit" id='edit' />
          </button>
        </span>
      </div>
    </>
  );
}

export { TodoSearch };