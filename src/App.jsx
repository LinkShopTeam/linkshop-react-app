// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppMain from './AppMain';
import LinkPostPage from './pages/LinkPostPage/linkpost';
import ListPage from './pages/ListPage/listpage';
import LinkDetailPage from './pages/LinkDetailPage/LinkDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppMain />} />
        <Route path='/list' element={<ListPage />} />
        <Route path='/linkpost' element={<LinkPostPage />} />
        <Route path='/link/:linkshopId' element={<LinkDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
