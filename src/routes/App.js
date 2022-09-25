import React from 'react';
import './App.css';
import { HomePage } from './home/HomePage';
import { NewTodoPage } from './new/NewTodoPage';
import { EditTodoPage } from './edit/EditTodoPage';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="/search=:searchValue" element={<HomePage />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </HashRouter>
  );
}

export { App };
