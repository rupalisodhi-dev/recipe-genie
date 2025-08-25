import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FavoritesProvider } from './context/FavoritesContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement ).render(
    <React.StrictMode>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </React.StrictMode>
  );

