import React from 'react'
import { useEffect,useState } from 'react'
import { batchStartEndAPI,getMonthlyWorkDaysAPI,postWorkingDaysAPI } from '../../../Services/TeacherService';
import validate from './validation';
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import Cookies from "js-cookie";


function AddWorkingDays() {

  const intialValues = { month: "", numberOfWorkingDays: "" }
  const [startEndDate, setStartEndDate] = useState({ startDate: "", endDate: "" })
  const [formValues, setFormValues] = useState(intialValues)
  const [error, setErrors] = useState({});
  const [monthData, setMonthData] = useState([])
  const [showData, setShowData] = useState(false)
  const [showPage, setShowPage] = useState(true)

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get('teacherToken')
      }
    }
    batchStartEndAPI(headers).then((response) => {
      if(response.data.status){
        setStartEndDate(response.data.dates)
      }else if(response.data.noBatch){
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
    getMonthlyWorkDaysAPI(headers).then((response) => {
      if(response.data.workingDays.length !==0){
        setMonthData(response.data.workingDays)
        setShowData(true)
      }else if(response.data.noBatch){
        showPage(false)
      }
    })
  },[])

  const handleChange = (e) => {
    e.preventDefault()
      const {name,value} = e.target
      setFormValues({...formValues,[name]: value}) 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate(formValues)
    if (Object.keys(errors).length!==0) {
      toast(errors.message);
    } else {
      Swal.fire({

        text: "Are you sure you want to submit?",
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes'

      }).then((result) => {
        if(result.isConfirmed) {
          setFormValues(intialValues)
          const data = {
            ...formValues
          }
          const headers = {
            headers: {
              Authorization: Cookies.get('teacherToken')
            }
          }
          postWorkingDaysAPI(data, headers).then((response) => {
            if(response.data.alert) {
              Swal.fire({
                text: response.data.alert,
                confirmButtonColor: 'green',
                confirmButtonText: 'OK'
              })
            } else if (response.data.status) {
              setMonthData(response.data.workingDays)
              setShowData(true)
              toast.success("Workdays added successfully", {
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
        }
      })
    }
  }


  return (
    <div>
       {showPage ?
    <section className="py-1 bg-blueGray-50 mt-4">
       
    <div className="w-full lg:w-full px-4 mx-auto mt-6">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border border-gray-600 rounded-lg shadow-lg bg-blueGray-100">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Add Number of Working Days
            </h6>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 font-normal mb-2">
                  Select month
                  </label>
                  <input className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={formValues.month}
                    onChange={handleChange}
                    name='month'
                    type="month"
                    min={startEndDate.startDate}
                    max={startEndDate.endDate}
                  />
           
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 font-normal mb-2">
                  
                    Number of Working Days
                  </label>
                  <input className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={formValues.numberOfWorkingDays}
                    onChange={handleChange}
                    name='numberOfWorkingDays'
                    type="number"
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

    {
            showData ?
            <div className='container mt-4 border border-gray-500 mx-4'>
            <div className='flex flex-wrap justify-center items-center '>
              <h5 className='mt-3 mb-4 text-xl font-medium'>Monthly working days</h5>
            </div>
            
            <div className='container flex flex-wrap items-center'>
              {monthData?.map((obj) => {
                const dateStr = obj.month;
                const date = new Date(dateStr);
                const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                return (
                  
                  <div key={obj._id} className='flex flex-col items-center justify-center m-8'>
                    <button className='bg-gray-600 p-4 rounded-lg'>
                    <div className='flex justify-center items-center'>
                      <p className='text-lg font-medium'>{formattedDate}</p>
                    </div>
                    <div className='flex justify-center items-center mt-2 '>
                      <p className='text-lg font-medium'>{obj.numberOfWorkingDays} days</p>
                    </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          
              :
              <p className='mb-5'></p>
          }
  </section>

  
      :
      <p></p>
    }
     </div>
  )
}

export default AddWorkingDays