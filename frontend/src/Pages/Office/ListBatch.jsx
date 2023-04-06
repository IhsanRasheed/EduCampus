import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import List from '../../Components/Office/ListBatch'


function ListBatch() {
  return (
    <div className='flex overflow-x-hidden'>
        <Sidebar/>
        <List/>

    </div>
  )
}

export default ListBatch