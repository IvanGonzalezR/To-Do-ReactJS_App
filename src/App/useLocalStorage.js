import React from "react";

// Custom React Hook
function useLocalStorage(itemName, initialValue) {
  //Llamamos a un React Hook que nos permite actualizar el valor de una variable
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [synchronizedItem, setSynchronizedItem] = React.useState(true);

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

        setItem(parsedItem);
        setLoading(false);
        setSynchronizedItem(true);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  }, [synchronizedItem]);

  const synchronizeItem = () => {
    setLoading(true);
    setSynchronizedItem(false);
  };

  const saveItem = (newItem) => {
    try {
      const stringedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
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

export { useLocalStorage };