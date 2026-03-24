import React from 'react'
import { Outlet, Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
 

const App = () => {

  return (
    <div className='bg-[#234829]'>
      <Navbar/>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App