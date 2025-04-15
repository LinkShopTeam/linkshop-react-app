import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppMain from './AppMain.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppMain />
  </StrictMode>,
);
