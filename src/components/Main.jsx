import React from 'react'
import Footer from './footer/Footer'
import Navbar from './navbar/Navbar'
import './Main.css'
function Main({message, handleLogout}) {
  return (
    <div className='mainfile'>

      <Navbar handleLogout={handleLogout} />
      <div className="">
        <h1>{message}</h1>
      </div>
      <Footer/> 
    </div>
  )
}

export default Main