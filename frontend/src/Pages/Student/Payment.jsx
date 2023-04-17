import React from 'react'
import StudentNav from '../../Components/Student/StudentNav'
import Payments from '../../Components/Student/Payments'


function Payment() {
  return (
    <div>
        <StudentNav/>
        <div className='mt-24'></div>
        <Payments/>
    </div>
  )
}

export default Payment