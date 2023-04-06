import React, { useEffect, useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validate from "./BatchValidation";
import subjectValidate from "./SubjectValidate";
import {
  addBatchAPI,
  availableTeachersAPI,
} from "../../../Services/OfficeService";

function AddBatches() {
  const initialVlaues = {
    startDate: "",
    duration: "",
    fee: "",
    numberOfSeat: "",
    headOfTheBatch: "",
    remarks: "",
  };

  const subjectInitiaValues = { subject: "", teacher: "" };

  const [formValues, setFormvalues] = useState(initialVlaues);
  // const [error, setErrors] = useState({})
  // const [subErrors,setSubErrors] = useState({})
  const [subjectValue, setSubjectValue] = useState(subjectInitiaValues);
  const [subjectValues, setSubjectValues] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [value] = useState(null);
  const navigate = useNavigate();

  console.log(formValues);
  console.log(subjectValue);
  console.log(subjectValues);
  console.log(teachers);

  useEffect(() => {
    availableTeachersAPI().then((response) => {
      if (response.data.status) {
        console.log("hi");
        setTeachers(response.data.teachers);
        setAllTeachers(response.data.allTeachers);
      }else{
        console.log(response)
      }
    });
  }, []);

  const onChangeHandle = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormvalues({ ...formValues, [name]: value });
    } else {
      const [value] = [e];
      const name = "headOfTheBatch";
      setFormvalues({ ...formValues, [name]: value });
    }
    // setErrors({...error, [name] : ""})
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setSubjectValue({ ...subjectValue, [name]: value });
    // setSubErrors({...subErrors, [name] : ""})
    if (e.target) {
      const { name, value } = e.target;
      setSubjectValue({ ...subjectValue, [name]: value });
    } else {
      const [value] = [e];
      const name = "teacher";
      setSubjectValue({ ...subjectValue, [name]: value });
    }
  };

  const addSubHandle = (e) => {
    e.preventDefault();
    const subErrors = subjectValidate(subjectValue);

    if (Object.keys(subErrors).length !== 0) {
      // setSubErrors(subErrors);
      toast(subErrors.message);
    } else {
      setSubjectValues([...subjectValues, subjectValue]);
      setSubjectValue(subjectInitiaValues);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length !== 0) {
      // setErrors(errors);
      toast(errors.message);
    } else {
      const data = {
        ...formValues,
        subjectValues,
      };

      addBatchAPI(data).then((response) => {
        
        if(response.data.status) {
          navigate('/office/batches')
          toast.success("Batch added successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.log(response.data)
        }
      });
    }
  };

  return (
    <section className=" py-1 bg-blueGray-50 mt-4 ">
      <div className="w-full lg:w-full px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Add Batches
              </h6>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      type="date"
                      label="Starting Date"
                      name="startDate"
                      value={formValues.startDate}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Duration (months)"
                      type="number"
                      name="duration"
                      value={formValues.duration}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Fee"
                      type="number"
                      name="fee"
                      value={formValues.fee}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Number of seats"
                      type="number"
                      name="numberOfSeat"
                      value={formValues.numberOfSeat}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Select
                      label="Head of the Batch"
                      name="headOfTheBatch"
                      value={value}
                      onChange={onChangeHandle}
                    >
                      {/* <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option> */}
                      {teachers.map((obj) => {
                        return (
                          <Option value={obj.registerId}>
                            {obj.name} ({obj.registerId})
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Remarks (Optional)"
                      name="remarks"
                      value={formValues.remarks}
                      onChange={onChangeHandle}
                    />
                  </div>
                </div>

                <p className="font-semibold w-full mt-4">Add Subject</p>

                <div className="w-full flex justify-end my-6">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={addSubHandle}
                  >
                    Add
                  </button>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Input
                      label="Subject"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <Select
                      label="Teacher"
                      name="teacher"
                      value={value}
                      onChange={handleChange}
                    >
                      {allTeachers.map((obj) => {
                        return (
                          <Option value={obj.name}>
                            {obj.name} ({obj.registerId})
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </div>


              <div className="flex">
                {subjectValues.map((obj) => {
                  return (
                    <div className="flex justify-center px-2" key={obj.subject}>
                      <div className="subjectAndTeacher container">
                        <span className="mt-2">
                          {obj.subject} : ({obj.teacher})
                        </span>

                        <button
                          className="font-semibold  text-xl px-3"
                          onClick={() =>
                            setSubjectValues(
                              subjectValues.filter(
                                (object) => object.subject !== obj.subject
                              )
                            )
                          }
                        >
                          X
                        </button>

                      </div>
                    </div>
                  );
                })}
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full mb-4"
              >
                Add Batches
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddBatches;
