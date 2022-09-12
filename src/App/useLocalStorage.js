import React from "react";

// Custom React Hook
function useLocalStorage(itemName, initialValue) {

  const [state, dispatch] = React.useReducer(reducer, initialState({initialValue}));
  const { 
      item,
      loading,
      error, 
      synchronizedItem,
  } = state;

  // const [item, setItem] = React.useState(initialValue);
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState(false);
  // const [synchronizedItem, setSynchronizedItem] = React.useState(true);

  //ACTION CREATORS
  const onError = (item) => dispatch({ type: actionTypes.error, payload: item });
  const onSuccess = (item) => dispatch({ 
    type: actionTypes.success,
    payload: item
  });
  const onSave = (item) => dispatch({ 
    type: actionTypes.save,
    payload: item
  });
  const onSynchronizeItem = () => dispatch({
    type: actionTypes.synchronizeItem,
  });

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

        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 1000);
  }, [synchronizedItem]);

  const synchronizeItem = () => {
    onSynchronizeItem();
  };

  const saveItem = (newItem) => {
    try {
      const stringedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  }

  return {
    item, 
    saveItem, 
    loading, 
    error,
    synchronizeItem
  };
}

const initialState = ({ initialValue }) => ({
  item: initialValue,
  loading: true,
  error: false,
  synchronizedItem: true,
});

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'SAVE',
  synchronizeItem: 'SYNCHRONIZE_ITEM',
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    loading: false,
    error: false,
    synchronizedItem: true,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.synchronizeItem]: {
    ...state,
    synchronizedItem: false,
    loading: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };