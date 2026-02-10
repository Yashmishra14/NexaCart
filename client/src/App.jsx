import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserReg from './Pages/UserReg'
import Userlogin from './Pages/Userlogin'
import RegLayout from './Layout/RegLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<RegLayout />} >
      <Route path='/' element={<UserReg />} />
        <Route path='/login' element={<Userlogin />} />
      </Route>   
      </Routes>
    </BrowserRouter>

  )
}

export default App
