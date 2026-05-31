import React, { useState } from 'react'
import './App.scss'
import SingIn from './components/SingIn/SingIn'
import { Route, Routes } from 'react-router'
import Home from './components/Home/Home'
import SingUp from './components/SingUp/SingUp'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='SingIn' element={<SingIn></SingIn>}></Route>
      <Route path='SingUp' element={<SingUp></SingUp>}></Route>
    </Routes>
    </>
  )
}

export default App
