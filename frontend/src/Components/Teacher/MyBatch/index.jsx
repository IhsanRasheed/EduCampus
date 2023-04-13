import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBatchAPI, getBatchPerformanceAPI } from '../../../Services/TeacherService';
import Cookies from "js-cookie";



function MyBatch() {

  const [performance,setPerormance]=useState({feeCompletionRate: "", avgPerformance: "", avgattendance: ""})
  const [batch, setBatch] = useState([])
  console.log(batch)
  const [availableSeat, setAvailableSeat] = useState('')
  const [showPage, setShowPage] = useState(true)
  const startDate = batch[0]?.startDate
  const DateStart = new Date(startDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const readableStartDate = DateStart.toLocaleDateString('en-US', options);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get('teacherToken')
      }
    }
    
    console.log(headers)

    getBatchAPI(headers).then((response) => {
      if(response.data.status){
        setBatch(response.data.batch)
        console.log(response.data.batch)
        setAvailableSeat(response.data.availableSeat)
      }else if (response.data.noBatch) {
        setShowPage(false)
      }
    })   
  },[])

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get('teacherToken')
      }
    }

    getBatchPerformanceAPI(headers).then((response) => {
      setPerormance(response.data)
    })

  },[])
  return (
    <div className=' p-8'>
      {showPage?
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  mx-4">
          <div className="col-span-1 ">
            <div className="bg-white shadow-2xl rounded-lg p-8 ">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Batch  Performance 
                  </p>
                </div>
                <p className="text-green-400 text-xl leading-none">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Avg batch attendance
                  </p>
                </div>
                <p className="text-green-400 text-xl leading-none mb-0">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Fee completion rate
                  </p>
                </div>
                <p className="text-green-400 text-xl leading-none mb-0">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Available Seats
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">2</p>
              </div>
            </div>
          </div>
        </div>
     

      
<h1 className="font-semibold text-2xl mt-8 ">Details of the Batch</h1>

      <div className="container-fluid  max-w-7xl  mt-4 shadow-xl">
        <div className="flex flex-col md:flex-row justify-evenly mb-4  py-2 text-lg">
          <div className="px-4 h-full">
            <div className="flex flex-wrap gap-x-32 gap-y-16 mt-3 mt-md-5 mb-4">
              <div>
                <span className="font-bold text-base mb-0">Batch</span>
                <br />
                <span className="text-muted text-base text-gray-600">
                  {batch[0]?.registerId}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">
                  Head of the Batch
                </span>
                <br />
                <span className="text-muted text-base text-gray-600 ">
                  {batch[0]?.teacher_data[0]?.name} ({batch[0]?.headOfTheBatch})
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">
                  Number of Students
                </span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0]?.batchFill}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Total Seats</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0]?.numberOfSeat}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Start date</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {readableStartDate}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Duration</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0]?.duration}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Course fee</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0]?.fee}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Remarks</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0]?.remarks}
                </span>
                <br />
              </div>

              <div>
                <span className="font-bold text-base mb-0">Subject</span>

                <table className="table w-full border border-gray-300 mt-4 ">
                  <thead className="font-bold text-base">
                    <tr>
                      <th className="p-1 border border-gray-300">
                        Sl No.
                      </th>
                      <th className="p-1 border border-gray-300">
                        Subject
                      </th>
                      <th className="p-1 border border-gray-300">
                        Teacher
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-muted text-base text-gray-600">
                    {batch[0]?.subjects.map((obj, i) => {
                      return (
                        <tr key={i}>
                          <td className="p-1 border border-gray-300">
                            {i + 1}
                          </td>
                          <td className="p-1 border border-gray-300">
                            {obj.subject}
                          </td>
                          <td className="p-1 border border-gray-300">
                            {obj.teacher}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> 
      </div>
      :
      <p>No batch Assigned</p>

}
    </div>
  )
}

export default MyBatch