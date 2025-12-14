import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Card from './pages/Card';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<AuthLayout />} />
        <Route path='/login' element={<LoginPage />} />

        <Route element={<MainLayout />} >
          <Route path='/home' element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/card' element={<Card />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
