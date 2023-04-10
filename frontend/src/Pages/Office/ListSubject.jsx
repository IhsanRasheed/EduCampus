import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import List from '../../Components/Office/ListSubject'


function ListSubject() {
  return (
    <div className='flex'>
        <Sidebar/>
        <List/>

    </div>
  )
}

export default ListSubject