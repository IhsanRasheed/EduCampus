import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from '../Pages/Login'
import Forgot from '../Pages/Forgot/Forgot'


function CommonRoutes() {
  return (
    <Routes>

      <Route path='/login' element={<Login/>}/>

      <Route path='/forgot-password' element={<Forgot/>}/>

    </Routes>


  )
}

export default CommonRoutes