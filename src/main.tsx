import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FavoritesProvider } from './context/FavoritesContext';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </React.StrictMode>
  );

