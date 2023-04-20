import React from 'react'
import Sidebar from '../../Components/Office/Sidebar'
import Payment from '../../Components/Office/Payments'

function Payments() {
  return (
    <div className='flex overflow-x-hidden'>
        <Sidebar/>
        <Payment/>
    </div>
  )
}

export default Payments