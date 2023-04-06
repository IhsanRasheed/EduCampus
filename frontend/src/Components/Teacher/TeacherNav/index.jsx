import React from "react";
import Logo from "../../Common/Logo";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function TeacherNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("teacherToken");
    navigate("/");
    toast.success('Teacher logget out', {
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
  return (

      <div
        className="container-fluid py-4 px-3 flex justify-between items-center border-b  border-gray-300 bg-white sticky"
        style={{ maxWidth: "1500px" }}
      >
        <div className="p-1">
          <Logo />
        </div>
        <div className="flex p-1 mr-2">
          <button >
            <img
              src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680658975/EduCampus/Common/setting_jrhuhk.svg"
              alt="settings"
              className="h-6"
            />
          </button>
          <button onClick={handleLogout} className="ml-4">
            <img
              src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680658920/EduCampus/Common/logout_p3qgtq.svg"
              alt="logout"
              className="h-6 transform rotate-180"
            />
          </button>
        </div>
      </div>

  );
}

export default TeacherNav;
