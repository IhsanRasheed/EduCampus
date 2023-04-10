import React, { useState, useEffect } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import validate from "./TeacherValidation";
import { toast } from "react-toastify";
import { addTeacherAPI } from "../../../Services/OfficeService";
import axios from "axios";

function AddTeacher() {
  const initialVlaues = {
    name: "",
    phone: "",
    email: "",
    date_of_birth: "",
    gender: "",
    salary: "",
    qualification: "",
    experience: "",
    remarks: "",
    house_name: "",
    place: "",
    post: "",
    pin: "",
    district: "",
    state: "",
    file: null,
  };

  const [formValues, setFormvalues] = useState(initialVlaues);
  const [imageURL, setImageURL] = useState(null);
  const [value] = useState(null);
  const navigate = useNavigate();
  console.log(formValues)


  //API call for dropdown state & district(select-material)
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  useEffect((e) => {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) => {
        setStates(response.data.states);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleStateChange = (event) => {
    const selectedValue = event;
    const [stateId, stateName] = selectedValue.split("-");

    const [value] = [stateName];
    setFormvalues({ ...formValues, state: value });

    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
      )
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDistrictChange = (event) => {
    const [value] = [event];
    setFormvalues({ ...formValues, district: value });
  };


  
  const onChangeHandle = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormvalues({ ...formValues, [name]: value });
    } else {
      const [value] = [e];
      const name = "gender";
      setFormvalues({ ...formValues, [name]: value });
    }
  };

  const handleFileChange = (event) => {
    setFormvalues({
      ...formValues,
      file: event.target.files[0],
    });
    const imageURL = URL.createObjectURL(event.target.files[0]);
    setImageURL(imageURL);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("name", formValues.name);
    data.append("phone", formValues.phone);
    data.append("email", formValues.email);
    data.append("date_of_birth", formValues.date_of_birth);
    data.append("gender", formValues.gender);
    data.append("salary", formValues.salary);
    data.append("qualification", formValues.qualification);
    data.append("experience", formValues.experience);
    data.append("house_name", formValues.house_name);
    data.append("place", formValues.place);
    data.append("post", formValues.post);
    data.append("pin", formValues.pin);
    data.append("state", formValues.state);
    data.append("district", formValues.district);
    data.append("file", formValues.file);

    const errors = validate(formValues);
    if (Object.keys(errors).length !== 0) {
      toast(errors.message);
    } else {
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem('officeToken')
        },
      };
      addTeacherAPI(data, headers).then((resp) => {
        if (resp.data.imageError) {
          toast(resp.data.imageError);
        } else {
          navigate("/office/teachers");
          toast.success("Teacher added successfully", {
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
      });
    }
  };

  return (
    <section className=" py-1 bg-blueGray-50 ">
      <div className="w-full lg:w-full px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Add Teacher
              </h6>
              {/* <button
              className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Save
            </button> */}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Name"
                      name="name"
                      value={formValues.name}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Email"
                      name="email"
                      value={formValues.email}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      type="date"
                      label="Date of Birth"
                      name="date_of_birth"
                      value={formValues.date_of_birth}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Select
                      label="Gender"
                      name="gender"
                      value={value}
                      onChange={onChangeHandle}
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Salary"
                      name="salary"
                      value={formValues.salary}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Qualification"
                      name="qualification"
                      value={formValues.qualification}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      type="Number"
                      label="Experience"
                      name="experience"
                      value={formValues.experience}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 text-gray-800">
                  <div className="relative w-full mb-3">
                    <div className="form-outline input-group-lg">
                      <input
                        name="file"
                        onChange={handleFileChange}
                        type="file"
                        id="formFile"
                        className="form-control"
                        accept="image/png, image/jpg, image/jpeg"
                      />
                    </div>
                    <div className="form-text text-sm  text-gray-500">
                      Max. 1MB size (500 X 500 ratio recommended)
                    </div>

                    <div
                      className="border border-1 mx-auto p-2"
                      style={{ width: "fit-content" }}
                    >
                      {imageURL ? (
                        <img
                          src={imageURL}
                          alt="profile"
                          width="150px"
                          height="150px"
                          id="profile-preview"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="border border-1 mx-auto p-2"
                          style={{ width: "fit-content" }}
                        >
                          <img
                            src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1679984478/EduCampus/student/user-add_opfqaa.svg"
                            alt="profile"
                            width="150px"
                            height="150px"
                            id="profile-preview"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <p className="p-4 text-gray-700">Address</p>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="House Name"
                      name="house_name"
                      value={formValues.house_name}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Place"
                      name="place"
                      value={formValues.place}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Post"
                      name="post"
                      value={formValues.post}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Pin Code"
                      name="pin"
                      value={formValues.pin}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Select
                      label="State"
                      name="state"
                      value={value}
                      onChange={handleStateChange}
                    >
                      {states.map((state) => (
                        <Option
                          key={state.state_id}
                          value={`${state.state_id}-${state.state_name}`}
                        >
                          {state.state_name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <Select
                      label="District"
                      name="district"
                      value={value}
                      onChange={handleDistrictChange}
                    >
                      {districts.map((district) => (
                        <Option
                          key={district.district_id}
                          value={district.district_name}
                        >
                          {district.district_name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full mb-4"
              >
                Create Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddTeacher;
