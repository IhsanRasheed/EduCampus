import React from "react";
import { useEffect } from "react";
import { getHomeAPI } from "../../../Services/StudentService";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../Redux/Action/index";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

function StudentHome() {
  const dispatch = useDispatch();
  const { storeStudentData } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get("studentToken"),
      },
    };
    getHomeAPI(headers).then((response) => {
      storeStudentData(response.data.studentData);
    });
  }, []);

  const details = useSelector((state) => state.studentData);

  const dateOfBirth = details?.studentData[0]?.date_of_birth;
  const date = new Date(dateOfBirth);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div
      className="container-fluid  max-w-7xl mx-4 shadow-xl mt-24"
      style={{ maxWidth: "1500px" }}
    >
    <div className="flex justify-end mb-6">
  <Link to="/student/leave-applications">
    <button className="bg-green-500 hover:bg-green-600 text-white font-bold p-1 rounded">
      Apply for leave
    </button>
  </Link>
</div>

      <div className="mt-1">
      <div className="flex flex-col md:flex-row justify-evenly mb-4  py-2 text-lg">
          <div className="flex flex-col justify-center items-center border-end border-r border-gray-300 my-5 px-4 min-w-[25%]">
            <img
              src={
                details?.studentData[0]?.image &&
                details.studentData[0].image[0]?.url
              }
              alt="could not load"
              className="me-2 w-24 h-24 rounded-full border-4 border-green-500 p-1 "
            />
            <span className="font-bold mt-2 text-lg">
              {details?.studentData[0]?.name}
            </span>
            <span
              className="text-muted text-sm"
              style={{ marginTop: "-8px" }}
              id="teacher-code"
            >
              ID: {details?.studentData[0]?.registerId}
            </span>
          </div>

          <div className="px-4 h-full">
            <div className="flex flex-wrap gap-x-14 gap-y-4 mt-3 mt-md-5 mb-4">
              <div>
                <span className="font-bold text-base mb-0">Batch</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.batch}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Phone</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.phone}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Email</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.email}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Date of Birth</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {formattedDate}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Gender</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.gender}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Parent</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.parentName}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">ParentPhone</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.parentPhone}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Education</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.education}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Institute</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.institute}
                </span>
                <br />
              </div>

              <div>
                <span className="font-bold text-base mb-0">Address</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {details?.studentData[0]?.address?.house_name} <br />
                  {details?.studentData[0]?.address?.place},
                  <br />
                  {details?.studentData[0]?.address?.post},
                  {details?.studentData[0]?.address?.pin},
                  <br />
                  {details?.studentData[0]?.address?.district},
                  {details?.studentData[0]?.address?.state}
                  <br />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
