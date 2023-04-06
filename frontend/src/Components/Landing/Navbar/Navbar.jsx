import React from 'react'
import Logo from '../../Common/Logo/'

function Navbar() {
  return (
    <div>
        <div className='flex justify-between align-items: center'>
        <Logo/>
        <a href='/login' className='bg-[#D2FFEA] hover:shadow-lg text-[#3BB88C] font-bold py-2 px-2 rounded-md'>Sign in</a>
        </div>
    </div>
  )
}

export default Navbar   