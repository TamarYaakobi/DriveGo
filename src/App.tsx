import React, { useEffect, useState } from 'react'
import './App.scss'
import SignIn from './components/SignIn/SignIn'
import { Route, Routes, useLocation } from 'react-router'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cars from './components/Cars/Cars'
import AboutUs from './components/AboutUs/AboutUs'
import NavBar from './components/NavBar/NavBar'
import CarDetails from './components/CarDetails/CarDetails'
import UserDetails from './components/UserDetails/UserDetails'
import AddCar from './components/AddCar/AddCar'

function App() {
  
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <NavBar></NavBar >
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='SignIn' element={<SignIn></SignIn>}></Route>
        <Route path='SignUp' element={<SignUp></SignUp>}></Route>
        <Route path='Cars' element={<Cars></Cars>}>
          <Route path=':category' element={<Cars></Cars>}></Route>
        </Route>
        <Route path='Cars/:category/:id' element={<CarDetails></CarDetails>}></Route>
        <Route path='AboutUs' element={<AboutUs></AboutUs>}></Route>
        <Route path='AddCar' element={<AddCar></AddCar>}></Route>
        <Route path='UserDetails' element={<UserDetails></UserDetails>}></Route>
      </Routes>
    </>
  )
}

export default App
