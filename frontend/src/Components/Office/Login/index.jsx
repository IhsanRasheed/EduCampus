import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { officeLoginAPI } from "../../../Services/OfficeService";
import Cookies from "js-cookie";

function Login() {
  // const token = localStorage.getItem('admin')

  const [error, setError] = useState("");
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();



    // const headers = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // };

    officeLoginAPI(formValues).then((response) => {
      if(response.data.status) {
        // localStorage.setItem('admin',response.data.token)
        Cookies.set('Admin', response.data.token, { expires: 7000 });
       navigate('/office/home')
      }else{
        setError(response.data.errors)
      }


    }).catch((error) => {
      console.log(error)

    })
  };

  return (
    <div className="mt-16 flex flex-row justify-center items-center min-h-fit">
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
                <div className="card-body p-10 my-5 text-black">
                  <form onSubmit={handleSubmit}>
                    <h5 className="font-medium text-2xl md:text-3xl pb-3 md:pb-5 text-center md:text-left">
                      Sign into your account
                    </h5>
                    <div className="mb-4">
                      <label
                        className="block font-medium text-sm mb-2"
                        htmlFor="email"
                      >
                        User name
                      </label>
                      <input
                        type="text"
                        value={formValues.email}
                        onChange={onChangeHandle}
                        id="email"
                        name="email"
                        className="border border-gray-300 py-2 px-3 w-full rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block font-medium text-sm mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formValues.password}
                        onChange={onChangeHandle}
                        className="border border-gray-300 py-2 px-3 w-full rounded-md"
                        required
                      />
                    </div>
                    {error && <p className="ms-2 text-red-600">{error}</p>}

                    <div className="mt-4">
                      <button
                        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full"
                        type="submit"
                      >
                        Login
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
  );
}

export default Login;
