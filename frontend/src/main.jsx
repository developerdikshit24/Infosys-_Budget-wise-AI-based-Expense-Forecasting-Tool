import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './pages/signup'
import Login from './pages/login'
import Dashboard from './pages/Dashboard.jsx';
import MainLayout from './pages/MainLayout.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='' element={<MainLayout />}>
        <Route path='' element={<Dashboard />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
