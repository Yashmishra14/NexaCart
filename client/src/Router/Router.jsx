import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import UserReg from '../Pages/UserReg'
import RegLayout from '../Layout/RegLayout'
import Home from '../Pages/Home'
import Product from '../Pages/Product'
import MainLayout from '../Layout/MainLayout'
import { Provider } from 'react-redux'
import { store } from '../Redux/store'

const Routers = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

const AppRoutes = () => {
  const { isloggin } = useSelector(state => state.user)
  return (
    <Routes>
      {/* If logged in, redirect root to /home; otherwise show registration layout */}
      <Route
        path='/'
        element={isloggin ? <Navigate to='/home' replace /> : <RegLayout />}
      >
        {!isloggin && <Route index element={<UserReg />} />}
      </Route>

      {/* Protected routes — Nav always visible via MainLayout */}
      <Route element={isloggin ? <MainLayout /> : <Navigate to='/' replace />}>
        <Route path='/home' element={<Home />} />
        <Route path='/product' element={<Product />} />
      </Route>
    </Routes>
  )
}

export default Routers
