// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppMain from './AppMain';
import LinkPostPage from './pages/LinkPostPage/LinkPostPage';
import LinkDetailPage from './pages/LinkDetailPage/LinkDetailPage';
import LinkEditPage from './pages/LinkEditPage/LinkEditPage';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppMain />} />
        <Route path='/list' element={<AppMain />} />
        <Route path='/linkpost' element={<LinkPostPage />} />
        <Route path='/link/:linkshopId' element={<LinkDetailPage />} />
        <Route path="/linkpost/:linkshopId/edit" element={<LinkEditPage />} />

      </Routes>
    </BrowserRouter>
  );
}


