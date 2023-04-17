import React,{useState,useEffect} from 'react'
import validate from './validaton'
import Swal from 'sweetalert2'
import Cookies from "js-cookie";
import { leaveHistoryAPI, postLetterAPI } from '../../../Services/StudentService';
import { toast } from "react-toastify";
import BaseTable from "../../Common/BaseTable";


function LeaveApplications() {

  const [letter, setLetter] = useState({ leaveLetter: "", from: "", to: ""})
  const [leaveHistory, setLeaveHistory] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalvalues, setModalValues] = useState({ appliedDate: "", status: "", letter: "", fromDate: "", toDate: "" })
  const [singleDate, setSingleDate] = useState(false)
  const [isReason, setIsReason] = useState(false)
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get('studentToken')
      }
    }
    leaveHistoryAPI(headers).then((response) => {
      if(response.data.status) {
        setLeaveHistory(response.data.leaveHistory)
      }
    })

  },[])

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setLetter({...letter, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
     
    const errors = validate(letter)

    if(Object.keys(errors).length !== 0) {
      toast(errors.message)
    } else {
      Swal.fire({

        text: "Are you sure you want submit leave application?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.isConfirmed) {
          const headers = {
            headers: {
              Authorization: Cookies.get('studentToken')
            }
          }

          postLetterAPI(letter, headers).then((response) => {
            setLetter({ leaveLetter: "", from: "", to: ""})
            toast.success("Succesfully sent leave Application", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            leaveHistoryAPI(headers).then((response) => {
              if(response.data.status) {
                setLeaveHistory(response.data.leaveHistory)
              }
            })
          })
        }
      })
    }
  }

  const handleModalClick = (appliedDate, fromDate, toDate, status, letter, reason) => {
    if(fromDate === toDate) {
      setSingleDate(true)
    }
    setIsModalOpen(true)
    if(reason !== "") {
      setIsReason(true)
    }
    setModalValues({
      appliedDate: appliedDate,
      status: status,
      letter: letter,
      fromDate: fromDate,
      toDate: toDate,
      reason: reason
    })
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
    setSingleDate(false)
    setIsReason(false)
  }

  const columns = [
    {
      name: "Sl No.",
      width: '80px',
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Applied Date",
      selector: (row) => row.myLeaves.appliedDate,
      sortable: true,
      width: '150px',
      cell: (row) => {
        const dateString = row.myLeaves.appliedDate;
        const date = new Date(dateString);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        return <div>{formattedDate}</div>;

        
      }
    },
    
    {
      name: "Status",
      selector: (row) => row.myLeaves.status,
    },
    {
      name: "View",
      cell: (row) => {
        const dateString = row.myLeaves.appliedDate;
        const date = new Date(dateString);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', dateOptions);

        const stringDate = row.myLeaves.from;
        const fromdate = new Date(stringDate);
        const fromdateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedFromDate = fromdate.toLocaleDateString('en-US', fromdateOptions);
    
        const dateStrings = row.myLeaves.to;
        const todate = new Date(dateStrings);
        const todateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedToDate = todate.toLocaleDateString('en-US', todateOptions);
    
        return (
          <div>
            <img
              className="hover:cursor-pointer"
              src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg"
              alt="Manage"
              width="24"
              height="24"
              onClick={() =>
                handleModalClick(
                  formattedDate,
                  formattedFromDate,
                  formattedToDate,
                  row.myLeaves.status,
                  row.myLeaves.letter,
                  row.myLeaves.reason,
                )
              }
            />




            
{isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm "></div>
            </div>

            <div className="bg-white rounded-lg p-6 max-w-lg mx-auto relative">
              <button
                className="absolute top-0 right-0 mt-3 mr-3"
                onClick={handleModalClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex justify-center">
                <h5 className="text-lg font-bold">Leave application details</h5>
              </div>

              <div className="mt-3">
                <div className="flex">
                  <strong>Applied date :</strong>
                  <p className="ml-3">{modalvalues.appliedDate}</p>
                </div>

                <div className="flex mt-3">
                  {singleDate ? (
                    <>
                      <strong>Leave date :</strong>
                      <p className="ml-3">{modalvalues.fromDate}</p>
                    </>
                  ) : (
                    <>
                      <strong>Leave period :</strong>
                      <p className="ml-3">
                        {modalvalues.fromDate} to {modalvalues.toDate}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex mt-1">
                  <strong>Status :</strong>
                  <p className="ml-3">{modalvalues.status}</p>
                </div>

                {isReason && (
                  <div className="flex mt-1">
                    <strong>Rejection reason :</strong>
                    <p className="ml-3">{modalvalues.reason}</p>
                  </div>
                )}

                <div className="flex justify-center mt-3">
                  <strong>Your letter</strong>
                </div>

                <p className="mt-1">{modalvalues.letter}</p>

                <div className="flex justify-center mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          </div>
        );
      },
    },
    
  ];



  return (
    <div className="mx-12">
    <div className="flex justify-between items-center">
      <div>
        <div className="border-2 border-gray-900 p-8 rounded-lg mx-16 px-12">
          <div className="flex justify-center items-center mt-3">
            <p className="text-center font-bold text-lg underline">
              Apply for leave
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-center items-center mt-1">
              <div className="flex flex-col">
                <label className="mx-2" htmlFor="from">
                  From
                </label>
                <input
                  onChange={handleChange}
                  value={letter.from}
                  className="fromToInput mx-2 my-2 border border-gray-500 rounded-md "
                  name="from"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="flex flex-col">
                <label className="mx-2" htmlFor="to">
                  To
                </label>
                <input
                  onChange={handleChange}
                  value={letter.to}
                  className="fromToInput mx-2 my-2 border border-gray-500 rounded-md"
                  name="to"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="flex justify-center items-center mt-1">
              <textarea
                onChange={handleChange}
                value={letter.leaveLetter}
                placeholder="Type your letter here"
                className="w-96 h-72 p-2 border border-gray-500 rounded resize-none placeholder-gray-500::placeholder"
                type="text"
                name="leaveLetter"
                id="leaveLetter"
              />
            </div>

            <div className="flex justify-center items-center mt-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="border-2 border-gray-900 p-8 rounded-lg mx-16 px-12 ">
          <div className="flex justify-center items-center mt-3">
            <p className="text-center font-bold text-lg underline">
              Leave History
            </p>
          </div>

          <div className="flex justify-center items-center mt-3 h-1/4">
            <BaseTable
              columns={columns}
              data={leaveHistory}
              fixedHeaderScrollHeight="310px"

            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LeaveApplications