import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Books from './app/Books';
import Dashboard from './app/Dashboard';
import Authors from './app/Authors';
import Publishers from './app/Publishers';
import Layout from './app/Layout';
import Profile from './app/Profile';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path='/auth/login' element={<Login />} />
          <Route path='/app' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='books' element={<Books />} />
            <Route path='authors' element={<Authors />} />
            <Route path='publishers' element={<Publishers />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



