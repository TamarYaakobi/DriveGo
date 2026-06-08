import React, { useState } from 'react'
import './App.scss'
import SingIn from './components/SingIn/SingIn'
import { Route, Routes } from 'react-router'
import Home from './components/Home/Home'
import SingUp from './components/SingUp/SingUp'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cars from './components/Cars/Cars'
import AboutUs from './components/AboutUs/AboutUs'
import NavBar from './components/NavBar/NavBar'
import CarDetails from './components/CarDetails/CarDetails'

function App() {
  return (
    <>
      <NavBar></NavBar >
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='SingIn' element={<SingIn></SingIn>}></Route>
        <Route path='SingUp' element={<SingUp></SingUp>}></Route>
        <Route path='Cars' element={<Cars></Cars>}>
          <Route path=':category' element={<Cars></Cars>}></Route>
        </Route>
        <Route path='Cars/:category/:id' element={<CarDetails></CarDetails>}></Route>
        <Route path='AboutUs' element={<AboutUs></AboutUs>}></Route>
      </Routes>
    </>
  )
}

export default App
