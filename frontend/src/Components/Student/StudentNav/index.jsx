import React from "react";
import Logo from "../../Common/Logo";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";


function StudentNav() {
  const navigate = useNavigate();
  let [open,setOpen]=useState(false);
  
  const handleLogout = () => {
    Cookies.remove("studentToken");
    navigate("/");
    toast.success('Studen logget out', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  let Links =[
    {name:"Home",link:"/student/home"},
    {name:"Academic Details",link:"/student/academic-details"},
    {name:"Leave Details",link:"/student/leave-applications"},
    {name:"Payments",link:"/student/payments"},
    {name:"Logout", onClick: handleLogout },
  ];

  
  return (

     
    <div className='shadow-md w-full fixed top-0 left-0'>
    <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800'>
    
      <Logo/>
    </div>
    
    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
    <ion-icon ></ion-icon>
    <img
              src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680658975/EduCampus/Common/setting_jrhuhk.svg"
              alt="settings"
              className="h-6"
              name={open ? 'close':'menu'}
            />
    </div>

    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
      {
        Links.map((link)=>(
          <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
          {link.onClick ? (
            <p
              className="text-gray-800 hover:text-gray-400 duration-500 hover:cursor-pointer  "
              onClick={link.onClick}
            >
              {link.name}
            </p>
          ) : (
            <a
              href={link.link}
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              {link.name}
            </a>
          )}
        </li>
        
        ))
      }
     
    </ul>
    </div>
  </div>


  );
}

export default StudentNav;
