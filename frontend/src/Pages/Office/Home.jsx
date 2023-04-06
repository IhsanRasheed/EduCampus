import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import OfficeHome from '../../Components/Office/Home'

export default function Home() {
  return (
    <div className='flex'>
        <Sidebar/>
        <OfficeHome/>
        
    </div>
  )
}
