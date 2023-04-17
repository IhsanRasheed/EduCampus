import React from 'react'
import StudentNav from '../../Components/Student/StudentNav'
import LeaveApplicatons from '../../Components/Student/LeaveApplications'


function LeaveApplication() {
  return (
    <div>
        <StudentNav/>
        <div className='mt-24'></div>
        <LeaveApplicatons/>
    </div>
  )
}

export default LeaveApplication