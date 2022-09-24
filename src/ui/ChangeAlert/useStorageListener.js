import React from 'react';

function useStorageListener(synchronizeTodos) {
      const [storageChange, setStorageChange] = React.useState(false);

   React.useEffect(() => {
      window.addEventListener('storage', (change) => {
         if(change.key === 'TODOS_V1'){
            console.log('hubo un cambio en el storage');
            setStorageChange(true);
         }
      });
   }, []);

   const toggleShow = () => {
      setStorageChange(false);
      synchronizeTodos();
   }

   return {
      show: storageChange,
      toggleShow
   };
};

export { useStorageListener };