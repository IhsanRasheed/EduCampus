import React from 'react'

function index() {
  return (
    <div className='p-2 relative'>
        <div className='flex justify-between items-center mb-7'>
            <p className='text-3xl font-bold max-w-lg'>Our moments</p>

            <div className='p-2 rounded-lg text-xl text-[#13D8FF] border-2 border-solid border-[#13D8FF]  hover:text-white hover:cursor-pointer hover:bg-[#13D8FF] '>
                View gallery
            </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 hover:cursor-pointer"'>
            <img className='w-full' src="/images/landing/gallery-1.png" alt="" />
            <img className='w-full' src="/images/landing/gallery-2.png" alt="" />
            <img className='w-full' src="/images/landing/gallery-3.png" alt="" />
            <img className='w-full' src="/images/landing/gallery-1.png" alt="" />
            <img className='w-full' src="/images/landing/gallery-2.png" alt="" />
            <img className='w-full' src="/images/landing/gallery-3.png" alt="" />
            <img className='w-full' src="/images/landing/gallery-1.png" alt="" />
            <img className='w-full' src="/images/landing/gallery-2.png" alt="" />
        </div>
    </div>
  )
}

export default index