import React from 'react'
import TeacherNav from "../../Components/Teacher/TeacherNav";
import LeaveApplications from '../../Components/Teacher/Leave Application/LeaveAppication'


function LeaveApplication() {
  return (
    <div>
      <TeacherNav/>
      <div className='mt-24'></div>
        <LeaveApplications/>
    </div>
    
   
  )
}

export default LeaveApplication