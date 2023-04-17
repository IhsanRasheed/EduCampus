import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  getMarkDetailsAPI,
  attendanceDetailsAPI,
} from "../../../Services/TeacherService";

function StudentData() {
  const location = useLocation();
  const [markDetails, setMarkDetails] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [tabs, setTabs] = useState({ markTab: true, attendanceTab: false });

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get("teacherToken"),
      },
    };
    const studentId = location.state.studentId;
    getMarkDetailsAPI(studentId, headers).then((response) => {
      if (response.status === 200) {
        setMarkDetails(response.data.markDetails);
      } else {
        console.log(response);
      }
    });
  }, []);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get("teacherToken"),
      },
    };
    const studentId = location.state.studentId;
    attendanceDetailsAPI(studentId, headers).then((response) => {
      if (response.data.status) {
        setMonthData(response.data.attendanceData);
      } else {
        console.log(response);
      }
    });
  }, []);

  const handleAttendanceButtonClick = (e) => {
    e.preventDefault();
    setTabs({ markTab: false, attendanceTab: true });
  };
  const handleMarkButtonClick = (e) => {
    e.preventDefault();
    setTabs({ markTab: true, attendanceTab: false });
  };

  return (
    <div className="container">
      <div className="flex flex-col">
        <div className="flex flex-row items-center mb-2 mx-16">
          <button
            onClick={handleMarkButtonClick}
            className={
              tabs.markTab
                ? "w-40 h-9 rounded-md border-2 border-blue-500 bg-blue-500 text-white flex justify-center items-center cursor-pointer ml-3"
                : "w-40 h-9 rounded-md border-2 border-gray-400 flex justify-center items-center cursor-pointer ml-3"
            }
          >
            <p className="mx-3">Mark details</p>
          </button>

          <button
            onClick={handleAttendanceButtonClick}
            className={
              tabs.attendanceTab
                ? "w-40 h-9 rounded-md border-2 border-blue-500 bg-blue-500 text-white flex justify-center items-center cursor-pointer ml-3"
                : "w-40 h-9 rounded-md border-2 border-gray-400 flex justify-center items-center cursor-pointer ml-3"
            }
          >
            <p className="mx-3">Attendance details</p>
          </button>
        </div>

        {tabs.markTab ? (
          <div className="flex flex-col items-center rounded-md border-2 border-gray-400 mx-16">
            <h5 className="text-xl font-bold mt-6  ">Mark details</h5>

            <div
              className="flex flex-wrap items-center justify-center parentDiv "
              style={{ height: "420px", overflowY: "auto", padding: "20px" }}
            >
              {markDetails?.map((obj) => {
                const dateStr = obj.month;
                const date = new Date(dateStr);
                const formattedDate = date.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                });
                
                return (
                  <div key={obj._id} className="flexchild ms-1 me-1">
                  <div className="container mt-2 overflow-x-auto">
                      <table className="table-auto rounded-lg border-2 border-gray-400 mx-4">
                        <caption className="font-bold text-black text-center">
                          {formattedDate}
                        </caption>
                        <thead className="rounded-md border-2 border-gray-400 ">
                          <tr>
                            <th className="px-4 py-2 rounded-md border-2 border-gray-400">
                              Subject
                            </th>
                            <th className="px-4 py-2 rounded-md border-2 border-gray-400">
                              Mark
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {obj.subjectMarks.map((object) => {
                            return (
                              <tr key={obj._id}>
                                <td className="px-4 py-2 rounded-md border-2 border-gray-400">
                                  {object.subject}
                                </td>
                                <td className="px-4 py-2 rounded-md border-2 border-gray-400">
                                  {object.mark}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className="flex justify-center">
                        <p className="font-bold">
                          Percentage: {obj.percentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md border-2 border-gray-400 mx-16">
            <h5 className="text-xl font-bold mt-6 mb-8">
              Monthly attendance details
            </h5>
            <div className="flex flex-wrap items-center justify-center h-96 overflow-y-auto p-4">
              {monthData?.map((obj) => {
                const dateStr = obj.month;
                const date = new Date(dateStr);
                const formattedDate = date.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                });
                return (
                  <div className="flexchild ms-1 me-1">
                  <div className="container mt-2 overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-400">
                      <caption className="font-bold text-center mb-2">{formattedDate}</caption>
                      <tbody  >
                        <tr className="border border-gray-400">
                          <td className="px-4 py-2 font-medium border border-gray-400">Working days</td>
                          <td className="px-4 py-2 ">{obj.workingDays}</td>
                        </tr>
                        <tr className="border border-gray-400">
                          <td className="px-4 py-2 font-medium border border-gray-400">Present days</td>
                          <td className="px-4 py-2">{obj.noOfDaysPresent}</td>
                        </tr>
                        <tr className="border border-gray-400">
                          <td className="px-4 py-2 font-medium border border-gray-400 ">Percentage</td>
                          <td className="px-4 py-2">{obj.percent} %</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentData;
