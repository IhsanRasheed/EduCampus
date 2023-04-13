import React from 'react'
import EachStudents from '../../Components/Teacher/EachStudent'
import TeacherNav from '../../Components/Teacher/TeacherNav'
import AddStudentData from '../../Components/Teacher/AddStudentData'

function EachStudent() {
  return (
    <div>
      <TeacherNav/>
      <div className='mt-24'></div>
        <EachStudents/>
        <AddStudentData />
    </div>
    
  )
}

export default EachStudent