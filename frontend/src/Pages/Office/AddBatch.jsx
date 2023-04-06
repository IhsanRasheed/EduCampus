import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import AddBatches from '../../Components/Office/AddBatch'


function AddBatch() {
  return (
    <div className='flex'>
        <Sidebar/>
        <AddBatches/>
    </div>
  )
}

export default AddBatch