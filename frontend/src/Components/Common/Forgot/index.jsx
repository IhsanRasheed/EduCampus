import React, { useState } from "react";
import Logo from "../Logo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { studentForgotAPI } from "../../../Services/StudentService";
import { teacherForgotAPI } from "../../../Services/TeacherService";

function Forgot() {
  const initialValues = { registerId: ""};
  const [formValues, setFormvalues] = useState(initialValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
  };

const handleSubmit = (event) => {
  event.preventDefault();

  const role = document.querySelector('input[name="role"]:checked').value;
  console.log(role)

  if( role === 'student') {
    studentForgotAPI(formValues).then((response) => {
      console.log(response.data)
      if(response.data.status){
        navigate('/login')
        toast.success("Password changed successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    })
  } else if ( role === 'teacher') {
    teacherForgotAPI(formValues).then((response) => {
      if(response.data.status) {
        console.log('heloo')
        navigate('/login')

      }
    })
  }

}

  return (
    <>
    <div className="p-3">
      <Logo />
    </div>

    <div className="mt-10 flex flex-row justify-center items-center min-h-fit">
      <div className="col col-span-10 xl:col-span-10">
        <div className="card rounded-lg bg-slate-50">
          <div className="flex flex-row flex-wrap gap-0">
            <div className="hidden md:block col-span-6 lg:col-span-5 my-auto pr-4">
              <img
                className="p-3 rounded-l-lg"
                src="/images/login_img.svg"
                alt=""
              />
            </div>

            <div>
              <div className="col-span-6 lg:col-span-7 flex items-center my-auto">
                <div className="card-body p-8 my-5 text-black">
                  <form onSubmit={handleSubmit}>
                    <h5 className="font-medium text-2xl md:text-3xl pb-3 md:pb-5 text-center md:text-left">
                   Forgot your Password
                    </h5>
                    <div className="mb-4">
                      <label
                        className="block font-medium text-sm mb-2"
                        htmlFor="username"
                      >
                        Register Id
                      </label>
                      <input
                        value={formValues.registerId}
                        onChange={onChangeHandle}
                        type="text"
                        id="username"
                        name="registerId"
                        className="border border-gray-300 py-2 px-3 w-full rounded-md"
                        required
                      />
                    </div>
                    {/* <div className="mb-4">
                      <label
                        className="block font-medium text-sm mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        // value={formValues.password}
                        // onChange={onChangeHandle}
                        type="password"
                        id="password"
                        name="password"
                        className="border border-gray-300 py-2 px-3 w-full rounded-md"
                        required
                      />
                    </div> */}

                    <div className="flex justify-around mb-12">
                      <div className="flex items-center">
                        <input
                          className="form-check-input h-5 w-5 text-indigo-600"
                          type="radio"
                          name="role"
                          id="role1"
                          value="student"
                          required
                        />
                        <label
                          htmlFor="role1"
                          className="ml-2 block text-sm font-medium text-gray-700"
                        >
                          I'm a student
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          className="form-check-input h-5 w-5 text-indigo-600"
                          type="radio"
                          name="role"
                          id="role2"
                          value="teacher"
                          required
                        />
                        <label
                          htmlFor="role2"
                          className="ml-2 block text-sm font-medium text-gray-700"
                        >
                          I'm a teacher
                        </label>
                      </div>
                    </div>

                    {/* {error && <p className="ms-2 text-red-600">{error}</p>} */}

                    <div className="mt-4">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Forgot