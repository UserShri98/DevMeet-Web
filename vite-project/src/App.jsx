import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Profile from './components/Profile'
import Login from './components/Login'
import Body from './components/Body'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'

function App() {

  return (
    <>
  <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
   <Route path='/' element={<Body/>}>
    <Route path='/' element={<Feed/>}/>

    <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/footer' element={<Footer/>}/>
   </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
   

    </>
  )
}

export default App
