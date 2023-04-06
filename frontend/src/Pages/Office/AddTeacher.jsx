import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import AddTeachers from '../../Components/Office/AddTeacher'

function AddTeacher() {
  return (
    <div className='flex'>
        <Sidebar/>
        <AddTeachers/>

    </div>
  )
}

export default AddTeacher