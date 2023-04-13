import React from 'react'
import MyStudents from '../../Components/Teacher/MyStudents'
import TeacherNav from '../../Components/Teacher/TeacherNav'

function MyStudent() {
  return (
    <div>
      <TeacherNav/>
      <div className='mt-24'>
      <MyStudents/>
      </div>
    </div>
  )
}

export default MyStudent