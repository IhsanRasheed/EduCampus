import React from 'react'
import Logo from '../../Components/Common/Logo'
import Login from '../../Components/Office/Login'

function OfficeLogin() {
  return (
    <div>
        <div  >
        <Logo LogoClass={'m-3'} />
        </div>
        <Login/>
    </div>
  )
}

export default OfficeLogin