import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../Pages/Student/Home'
import StudentVerification from '../Verification/StudentVerification'
import AcademicDetails from '../Pages/Student/AcademicDetails'
import LeaveApplication from '../Pages/Student/LeaveApplication'
import Payment from '../Pages/Student/Payment'


function StudentRoutes() {
  return (
    <Routes>

      <Route path='/home' element={<StudentVerification><Home/></StudentVerification>}></Route>

      <Route path='/academic-details' element={<StudentVerification><AcademicDetails/></StudentVerification>}></Route>

      <Route path='/leave-applications' element={<StudentVerification><LeaveApplication/></StudentVerification>}></Route>

      <Route path='/payments' element={<StudentVerification><Payment/></StudentVerification>}></Route>

    </Routes>


  )
}

export default StudentRoutes