import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { DeliveryAppProvider } from './context/DeliveryAppContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DeliveryAppProvider>
        <App />
      </DeliveryAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
