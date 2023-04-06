import React from 'react'

function Logo({LogoClass}) {
  return (
  
    <a href="/">
      <img className={LogoClass} src="/images/logo.png" alt="edWorld" height="35px" />
    </a>
  
  )
}

export default Logo