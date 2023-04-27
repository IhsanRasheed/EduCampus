import React, { useState,useEffect } from 'react'
import { getDashboarAPI } from '../../../Services/OfficeService';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Home() {

  const navigate = useNavigate()
    const [dashboardData, setDashboardData] = useState({
      studentsCount: "",
      batchCount: "",
      teacherCount: "",
      feeCompletionRate: "",
      batchData: [],
      teacherData: []
    })

    useEffect(() => {
      const headers = {
        headers: {
          Authorization: localStorage.getItem('officeToken')
        }
      }
      getDashboarAPI(headers).then((response) => {
        setDashboardData(response.data)
      })
    },[])

    const handleClick = (action) => {
      if(action === "HOST NEW BATCH"){
        navigate('/office/add-batch')
      }else if(action === 'ADD TEACHER') {
        navigate('/office/add-teacher')
      }else if(action === 'ADD STUDENT') {
        navigate('/office/add-student')
      }
    }
  
  return (
    <div className="p-6 w-screen overflow-x-hidden">
      <p className="font-medium  text-3xl ">Welcome!</p>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="col-span-1 ">
            <div className="bg-white shadow-2xl rounded-lg p-8 ">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Batches
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none">{dashboardData?.batchCount}</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Teachers
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">{dashboardData?.teacherCount}</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Students
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">{dashboardData?.studentsCount}</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Fee
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">{dashboardData?.feeCompletionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>


<div className="flex justify-evenly flex-wrap mt-2">
  <div className='mt-12'>
  <BarChart width={600} height={400} data={dashboardData?.batchData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="batch" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="seats" fill="#8884d8" />
      <Bar dataKey="students" fill="#82ca9d" />
    </BarChart>
  </div>

  <div className='w-96 h-80 shadow-lg p-4 mt-16'>
  <div className="flex justify-center mt-5">
  <h3 className="font-bold underline">QUICK ACTIONS</h3>
</div>
<div className="flex flex-col mt-2 mb-2 ">
<button onClick={() => handleClick("HOST NEW BATCH")} className='h-12 rounded-lg border-solid border-4 hover:bg-green-500 hover:text-white mt-3 mb-3'><strong>HOST NEW BATCH</strong></button>
<button onClick={() => handleClick("ADD TEACHER")} className='h-12 rounded-lg border-solid border-4 hover:bg-green-500 hover:text-white mt-3 mb-3'><strong>ADD TEACHER</strong></button>
<button onClick={() => handleClick("ADD STUDENT")} className='h-12 rounded-lg border-solid border-4 hover:bg-green-500 hover:text-white mt-3 mb-3'><strong>ADD STUDENT</strong></button>
</div>


  </div>

</div>



    </div>
  );
}

export default Home;
