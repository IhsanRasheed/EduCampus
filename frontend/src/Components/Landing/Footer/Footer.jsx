import React from "react";
import Logo from "../../Common/Logo";

function Footer() {
  return (
    <>

    <div className="flex flex-wrap justify-between p-3">

      <div >
        <Logo />
        <p className="mt-5  text-gray-600 width max-w-sm flex">
          Our motto to fulfill student demand by making  them industry ready
          experts to kick start their career
        </p>
      </div>


      <div className="mx-3">
        <p className="mt-4  text-gray-600 text-xl font-bold max-w-lg">About</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">About Us</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">News</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">Features</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">Careers</p>
        <p className="mt-4  text-gray-600 hover:text-black hover:cursor-pointer">FAQ</p>
      </div>  

      <div>
        <p className="mt-4  text-gray-600 text-xl font-bold max-w-lg">Support</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">Account</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">Support Center</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">Feedback</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">Contact Us</p>
        <p className="mt-4  text-gray-600  hover:text-black hover:cursor-pointer">Accesbility</p>
      </div> 


      <div className="mt-4  text-gray-600 text-xl font-bold max-w-lg">
        <p>Get our app</p> 

        <img className="mt-8" src="./images/google.png" alt="Google Play" />
        <img className="mt-8" src="./images/app.png" alt="App Store" />
      </div>
    </div>

     <div className="border-t-2 border-gray-300 mt-8 ">
      <p className="py-10  text-gray-600">©Copyright eduCampus 2023 All rights reserved.</p>
    </div>
    </>
  );
}

export default Footer;
