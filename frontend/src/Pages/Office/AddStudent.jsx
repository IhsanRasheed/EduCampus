import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import AddStudents from '../../Components/Office//AddStudent'

function AddStudent() {
  return (
    <div className='flex'>
      <Sidebar/>
      <AddStudents/>
    </div>
  )
}

export default AddStudent