import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  availableMonthAPI,
  getBatchSubjectsAPI,
  batchStartEndAPI,
  postStudentAttendanceAPI,
  addMarkAPI
} from "../../../Services/TeacherService";
import { validate, validateMarks } from "./validation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AddStudentData() {
  const location = useLocation();
  const [availableMonth, setAvailableMonth] = useState([]);
  const [formNoOfDays, setFormNoOfDays] = useState({ noOfDaysPresent: "" });
  const [formMonth, setFormMonth] = useState({ month: "", workingDays: "" });
  const formRef = useRef(null);
  const navigate= useNavigate()

  const [subjects, setSubjects] = useState([]);
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [subjectMarks, setSubjectMarks] = useState([{ subject: "", mark: "" }]);
  const [month, setMonth] = useState({ month: "" });


  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get("teacherToken"),
      },
    };
    availableMonthAPI(headers).then((response) => {
      setAvailableMonth(response.data.availableMonth);
    });
  }, []);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get("teacherToken"),
      },
    };
    const batchId = location.state.studentData.batch;
    getBatchSubjectsAPI(batchId, headers).then((response) => {
      setSubjects(response.data.subjects);
      setSubjectMarks(response.data.subjects);
    });
  }, []);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get("teacherToken"),
      },
    };
    batchStartEndAPI(headers).then((response) => {
      if (response.data.status) {
        setStartEndDate(response.data.dates);
      }
    });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormNoOfDays({ ...formNoOfDays, [name]: value });
  };

  const changeHandle = (e, workingDays) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormMonth({ month: value, workingDays: workingDays });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formMonth, formNoOfDays);
    if (Object.keys(errors).length !== 0) {
      toast(errors.message);
    } else {
      Swal.fire({
        text: "Are you sure you want to submit?",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const headers = {
            headers: {
              Authorization: Cookies.get("teacherToken"),
            },
          };

          const data = {
            studentId: location.state.studentData.registerId,
            month: formMonth.month,
            noOfDaysPresent: formNoOfDays.noOfDaysPresent,
            workingDays: formMonth.workingDays,
          };

          postStudentAttendanceAPI(data, headers).then((response) => {
            if (response.data.alert) {
              Swal.fire({
                text: response.data.alert,
                confirmButtonColor: "green",
                confirmButtonText: "OK",
              });
            } else if (response.data.status) {
              setFormMonth({ month: "", workingDays: "" });
              setFormNoOfDays({ noOfDaysPresent: "" });
              toast.success("successfully submitted Data", {
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
      });
    }
  };

  const handleMarkUpdate = (e,index) => {
    const values = [...subjectMarks]
    const { name, value} = e.target
    const updateMark = values.map((subject,i) => {
      if( i=== index) {
        return{...subject, mark: parseInt(value)}
      }
      return subject
    })
    setSubjectMarks(updateMark)
  }

  const handleMonthChange = (e) => {
    e.preventDefault()
    const { name, value} = e.target
    setMonth({ month: value})
  }

  const handleMarkSubmit = (e) => {
    e.preventDefault()
    const errors = validateMarks(month, subjectMarks)
    if(Object.keys(errors).length !==0) {
      toast(errors.message);
    }else {
      Swal.fire({
        text: "Are you sure you want to submit?",
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes'

      }).then((result) => {
        if(result.isConfirmed) {
          const headers = {
            headers: {
              Authorization: Cookies.get("teacherToken"),
            },
          };
          const data = {
            studentId: location.state.studentData.registerId,
            month: month.month,
            subjectMarks
          }
          
          addMarkAPI(data, headers).then((response) => {
            if(response.data.status) {
              console.log('hi')
              formRef.current.reset()
              setMonth({ month: "" })
              setSubjectMarks(subjectMarks.map(item => ({ ...item, mark: "" })));
              toast.success("successfully submitted Data", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

            }else if(response.data.alert) {
              Swal.fire({
                text: response.data.alert,
                confirmButtonColor: 'green',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  setMonth({ month: "" })
                }
              })

            }
          })
        }
      })
    }
  }

  const handleClick = () => {
    navigate('/teacher/student-data', {
      state: {
        studentId:location.state.studentData.registerId
      }
    })
  }


  return (
    <>

<div className="flex flex-wrap justify-center items-center ms-4 me-4 mb-5">
  <button onClick={handleClick} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
    Click here to view student history
  </button>
  </div>
      <div className="flex justify-center mt-8">

    


        <div className="bg-white rounded-md shadow p-4 border border-gray-600">
          <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
            <h6 className="text-blueGray-700 text-xl font-bold">Add Marks</h6>
            <form ref={formRef} onSubmit={handleMarkSubmit}>
              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex flex-col mt-3">
                  <p className="text-lg font-medium">Select month</p>
                  <input
                    value={month.month}
                    onChange={handleMonthChange}
                    className="p-2 border border-gray-400 rounded-md"
                    name="month"
                    type="month"
                    min={startEndDate.startDate}
                    max={startEndDate.endDate}
                  />
                </div>
              </div>

              {subjects?.map((obj, index) => {
              return(
                <div
                  key={obj._id}
                  className="d-flex justify-content-center align-items-center mt-3"
                >
                  <input
                    value={obj.subject}
                    readOnly
                    name="subject"
                    className="p-2 border border-gray-400 rounded-md"
                    type="text"
                  />
                  <input
                  onChange={(e) => handleMarkUpdate(e, index)}
                    placeholder="Mark (Out of 100)"
                    name="mark"
                    className="p-2 border border-gray-400 rounded-md ml-2"
                    type="number"
                  />
                </div>
              )
})}

              <div className="d-flex justify-content-center align-items-center mt-3"></div>

              <button
                type="submit"
                className="bg-green-500 text-white rounded-md py-2 px-4 mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <section className="py-1 bg-blueGray-50 mt-4 ">
        <div className="w-full lg:w-full px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border border-gray-600 rounded-lg shadow-lg bg-blueGray-100">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add Attendance
                </h6>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block text-gray-600 font-normal mb-2">
                        Month
                      </label>
                      <select
                        onChange={(e) =>
                          changeHandle(
                            e,
                            availableMonth.find(
                              (obj) => obj.month === e.target.value
                            )?.numberOfWorkingDays
                          )
                        }
                        value={formMonth?.month}
                        className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        name="month"
                        id="month"
                      >
                        <option value="Select a month" defaultValue>
                          Select a month
                        </option>
                        {availableMonth?.map((obj) => {
                          const dateStr = obj.month;
                          const date = new Date(dateStr);
                          const formattedDate = date.toLocaleString("en-US", {
                            month: "long",
                            year: "numeric",
                          });
                          return (
                            <option
                              name="month"
                              key={obj._id}
                              value={obj.month}
                            >
                              {formattedDate} (working days{" "}
                              {obj.numberOfWorkingDays})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block text-gray-600 font-normal mb-2">
                        Number of days present
                      </label>
                      <input
                        onChange={handleChange}
                        value={formNoOfDays?.noOfDaysPresent}
                        name="noOfDaysPresent"
                        type="number"
                        className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-2/2 mt-4"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddStudentData;
