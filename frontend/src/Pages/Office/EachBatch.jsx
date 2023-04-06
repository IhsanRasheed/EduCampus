import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import Batch from '../../Components/Office/EachBatch'

function EachBatch() {
  return (
    <div className='flex'>
         <Sidebar/>
         <Batch/>
    </div>
  )
}

export default EachBatch