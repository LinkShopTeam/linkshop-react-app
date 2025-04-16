// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppMain from './AppMain';
import LinkPostPage from './pages/LinkPostPage/LinkPost';
import ListPage from './pages/ListPage/LinkPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppMain />} />
        <Route path='/list' element={<ListPage />} />
        <Route path='/linkpost' element={<LinkPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
