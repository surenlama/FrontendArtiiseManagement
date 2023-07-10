import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';

import App from './App';

function Router() {
  return (
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />

      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
