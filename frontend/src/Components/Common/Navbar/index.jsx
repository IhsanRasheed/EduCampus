import React from 'react'
import Logo from ''

function Navbar() {
  return (
    <nav>        
    <div className="container-fluid py-4 px-3 flex justify-between items-center border-b  border-gray-300 bg-white sticky" style={{ maxWidth: '1500px' }}>
<div className="p-1">
       <Logo/>
       </div>
        <div className="flex p-1 mr-2">
          <a href="/#">
            <img
              src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680658975/EduCampus/Common/setting_jrhuhk.svg"
              alt="settings"
              className="h-6"
            />
          </a>
          <a href="/logout" className="ml-4">
            <img
              src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680658920/EduCampus/Common/logout_p3qgtq.svg"
              alt="logout"
              className="h-6 transform rotate-180"
            />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar