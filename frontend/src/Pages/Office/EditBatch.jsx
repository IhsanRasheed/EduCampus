import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import Edit from '../../Components/Office/EditBatch'

function EditBatch() {
  return (
    <div className='flex'>
        <Sidebar/>\
        <Edit/>
    </div>
  )
}

export default EditBatch