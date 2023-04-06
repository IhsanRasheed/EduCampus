import React from 'react'
import Footer from '../../Components/Landing/Footer/Footer'
import Navbar from '../../Components/Landing/Navbar/Navbar'
import Section1 from '../../Components/Landing/Section1/'
import Section2 from '../../Components/Landing/Section2/'
import Section3 from '../../Components/Landing/Section3/'
import Section4 from '../../Components/Landing/Section4/'

function Landing() {
  return (
    <div className='p-5'>
      <Navbar/>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Footer/>
    </div>
  )
}

export default Landing