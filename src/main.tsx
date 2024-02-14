import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SisenseContextProvider } from '@sisense/sdk-ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SisenseContextProvider
      url={import.meta.env.VITE_APP_SISENSE_URL}
      token={import.meta.env.VITE_APP_SISENSE_TOKEN}
    >
      <App />
    </SisenseContextProvider>
  </React.StrictMode>
);
