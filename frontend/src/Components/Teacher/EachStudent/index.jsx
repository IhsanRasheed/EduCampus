import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function EachStudent() {
  const location = useLocation()
  const details = location.state.studentData



  return (
<div className=''>
<section className='mx-8'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="col-span-1 ">
            <div className="bg-white shadow-2xl rounded-lg p-8 ">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Attendance
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Performance
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Fee completion
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Student history
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    <div
    className="container-fluid  max-w-7xl mx-4 mt-8 shadow-xl"
    style={{ maxWidth: "1500px" }}
  >
    <div className="mt-1">
    <div className="flex flex-col md:flex-row justify-evenly mb-4  py-2 text-lg">
        <div className="flex flex-col justify-center items-center border-end border-r border-gray-300 my-5 px-4 min-w-[25%]">
          <img
            src={
              details?.image &&
              details.image[0]?.url
            }
            alt="could not load"
            className="me-2 w-24 h-24 rounded-full border-4 border-green-500 p-1 "
          />
          <span className="font-bold mt-2 text-lg">
            {details.name}
          </span>
          <span
            className="text-muted text-sm"
            style={{ marginTop: "-8px" }}
            id="teacher-code"
          >
            ID: {details.registerId}
          </span>
        </div>

        <div className="px-4 h-full">
          <div className="flex flex-wrap gap-x-14 gap-y-4 mt-3 mt-md-5 mb-4">
            <div>
              <span className="font-bold text-base mb-0">Batch</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.batch}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">Phone</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.phone}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">Email</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.email}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">Date of Birth</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {/* {formattedDate} */}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">Gender</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.gender}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">Parent</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.parentName}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">ParentPhone</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.parentPhone}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">Education</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.education}
              </span>
              <br />
            </div>
            <div>
              <span className="font-bold text-base mb-0">Institute</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.institute}
              </span>
              <br />
            </div>

            <div>
              <span className="font-bold text-base mb-0">Address</span>
              <br />
              <span className="text-muted text-base text-gray-600 mt-0">
                {details?.address?.house_name} <br />
                {details?.address?.place},
                <br />
                {details?.address?.post},
                {details?.address?.pin},
                <br />
                {details?.address?.district},
                {details?.address?.state}
                <br />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default EachStudent