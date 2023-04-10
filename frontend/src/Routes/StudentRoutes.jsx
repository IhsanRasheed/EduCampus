import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../Pages/Student/Home'
import StudentVerification from '../Verification/StudentVerification'


function StudentRoutes() {
  return (
    <Routes>

      <Route path='/home' element={<StudentVerification><Home/></StudentVerification>}></Route>

    </Routes>


  )
}

export default StudentRoutes