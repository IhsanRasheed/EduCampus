import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from '../Pages/Student/LoginStudent/'
import Home from '../Pages/Student/Home'


function StudentRoutes() {
  return (
    <Routes>

      <Route path='/login' element={<Login/>}/>

      <Route path='/home' element={<Home/>}></Route>

    </Routes>


  )
}

export default StudentRoutes