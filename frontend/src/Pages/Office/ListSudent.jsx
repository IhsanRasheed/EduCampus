import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import List from '../../Components/Office/ListStudent'

function ListTeacher() {
    return (
        <div className='flex overflow-x-hidden'>
            <Sidebar/>
            <List/>
        </div>
    )
}

export default ListTeacher