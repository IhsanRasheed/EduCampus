import React from 'react'
import TeacherNav from '../../Components/Teacher/TeacherNav'
import StudentLeaveApplications from '../../Components/Teacher/StudentLeaveApplication'

function StudentLeaveApplicatin() {
  return (
    <div>
      <TeacherNav/>
      <div className="mt-24"> </div>
      <StudentLeaveApplications/>
    </div>
  )
}

export default StudentLeaveApplicatin