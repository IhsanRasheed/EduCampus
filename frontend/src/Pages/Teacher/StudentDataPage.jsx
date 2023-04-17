import React from 'react'
import TeacherNav from '../../Components/Teacher/TeacherNav'
import StudentData from '../../Components/Teacher/StudentData'


function StudentDataPage() {
  return (
    <div>
        <TeacherNav/>
        <div className="mt-24"> </div>
        <StudentData/>
    </div>
  )
}

export default StudentDataPage