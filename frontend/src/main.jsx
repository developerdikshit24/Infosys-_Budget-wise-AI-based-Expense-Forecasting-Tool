import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './pages/Signup.jsx'

import Dashboard from './pages/Dashboard.jsx';
import MainLayout from './pages/MainLayout.jsx';
import AddExpense from './pages/AddExpense.jsx';
import RightLayout from './pages/RightLayout.jsx';
import Categories from './pages/Categories.jsx';
import MonthlyBudget from './pages/MonthlyBudget.jsx';
import { Provider } from 'react-redux'
import store from './stores/store.js';
import Login from './pages/login.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<MainLayout />}>

            {/* Right Layout Structure */}
            <Route path='' element={<RightLayout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='/add-expense' element={<AddExpense />} />
            </Route>
            <Route path='/categories' element={<Categories />} />
            <Route path='/monthly-budget' element={<MonthlyBudget />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
