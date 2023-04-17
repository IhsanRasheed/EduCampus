import React from 'react'
import StudentNav from '../../Components/Student/StudentNav'
import StudentDetails from '../../Components/Student/AcademicDetails'

function AcademicDetails() {
  return (
    <div>
    <StudentNav/>
    <div className='mt-24'></div>
      <StudentDetails/>
  </div>
  )
}

export default AcademicDetails