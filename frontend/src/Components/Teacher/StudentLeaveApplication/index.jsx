import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  studentLeaveApplicationAPI,
  leaveApproveAPI,
  leaveRejectAPI
} from "../../../Services/TeacherService";
import BaseTable from '../../Common/BaseTable'

function StudentLeaveApplication() {
  const [leaveData, setLeaveData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [modalvalues, setModalValues] = useState({
    appliedDate: "",
    status: "",
    letter: "",
    registerId: "",
    id: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const [rejectmodalValues, setRejectModalvalues] = useState({
    registerId: "",
    id: "",
  });
  const [singleDate, setSingleDate] = useState(false);
  const [formValue, setFormValue] = useState({ reason: "" });
  const [isReason, setIsReason] = useState(false);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get("teacherToken"),
      },
    };
    studentLeaveApplicationAPI(headers).then((response) => {
      setLeaveData(response.data.leaveData);
    });
  }, []);

  const handleModalClick = (
    appliedDate,
    fromDate,
    toDate,
    status,
    letter,
    reason,
    registerId,
    objectId
  ) => {
    if (fromDate === toDate) {
      setSingleDate(true);
    }

    setIsModalOpen(true);
    if (reason !== "") {
      setIsReason(true);
    }
    setModalValues({
      appliedDate: appliedDate,
      status: status,
      letter: letter,
      fromDate: fromDate,
      toDate: toDate,
      reason: reason,
      registerId: registerId,
      id: objectId,
    });
  };

  const RejectReasonModalClick = (registerId, id) => {
    setRejectModalvalues({
      registerId: registerId,
      id: id,
    });
    setIsModalOpen(false);
    setIsRejectModalOpen(true);
  };

  const handleReasonChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleApprove = (id, arrayElementId) => {
    Swal.fire({
      text: "Are you sure you want to approve this application  ? Once approved can not be edited later",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: id,
          arrayElementId: arrayElementId,
        };
        const headers = {
          headers: {
            Authorization: Cookies.get("teacherToken"),
          },
        };
        leaveApproveAPI(data, headers).then((response) => {
          if (response.data.status) {
            const data = leaveData.filter((value) => {
              if (value.myLeaves._id === arrayElementId) {
                value.myLeaves.status = "Approved";
              }
              return value;
            });
            setLeaveData(data);

            setIsRejectModalOpen(false);
            setFormValue({ reason: "" });
            toast.success("Application has been approved", {
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
  };

  const handleReject = (e, id, arrayElementId) => {
    console.log(e)
    console.log(id)
    console.log(arrayElementId)
    e.preventDefault()
    Swal.fire({
      text: "Are you sure you want to reject this application ? Once Rejected can not be edited later",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if(result.isConfirmed) {
        const data = {
          id: id,
          arrayElementId: arrayElementId,
          reason: formValue.reason
      }
      const headers = {
        headers: {
          Authorization: Cookies.get("teacherToken"),
        },
      };
      leaveRejectAPI(data, headers).then((response) => {
        if(response.data.status) {
          const data = leaveData.filter((value) => {
            if (value.myLeaves._id === arrayElementId) {
                value.myLeaves.status = "Rejected"
            }
            return value;
        })
        setLeaveData(data)
                       
                        setIsRejectModalOpen(false)
                        setFormValue({ reason: "" })
                        toast.success("Application has been rejected", {
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

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSingleDate(false)
    setIsReason(false)
}

const columns = [
  {
    name: "Sl No.",
    // width: '80px',
    cell: (row, index) => <div>{index + 1}</div>,
  },
  {
    name: "RegisterId",
    // width: '80px',
    selector: (row) => row.registerId,
  },
  {
    name: "Name",
    // width: '80px',
    selector: (row) => row.name,
  },
  {
    name: "Applied Date",
    selector: (row) => row.myLeaves.appliedDate,
    sortable: true,
    // width: '150px',
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
      const appliedDate = new Date(row.myLeaves.appliedDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const readableDate = appliedDate.toLocaleDateString('en-US', options);

      const stringDate = row.myLeaves.from
      const fromdate = new Date(stringDate);
      const fromdateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedFromDate = fromdate.toLocaleDateString('en-US', fromdateOptions);

      const dateStrings = row.myLeaves.to
      const todate = new Date(dateStrings);
      const todateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedToDate = todate.toLocaleDateString('en-US', todateOptions);

      return(
        <>
        <div>
        <img
          className="hover:cursor-pointer"
          src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg"
          alt="Manage"
          width="24"
          height="24"
          onClick={() =>
            handleModalClick(
              readableDate,
              formattedFromDate,
              formattedToDate,
              row.myLeaves.status,
              row.myLeaves.letter,
              row.myLeaves.reason,
              row.registerId,
              row.myLeaves._id,
            )
          }
        />
{isModalOpen && (
   <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  z-50">
    <div className="flex items-center justify-center min-h-screen ">
      <div className="modal-contents bg-white shadow-md rounded-md w-2/5 p-8">
        <div className='flex justify-center'>
          <h5><strong>Leave application details</strong></h5>
        </div>
        <div className='flex mt-3'>
          <strong>Applied date :</strong>
          <p className='ms-3'>{modalvalues.appliedDate}</p>
        </div>
        <div className='flex mt-3'>
          {singleDate ?
            <>
              <strong>Leave date</strong>
              <p className='ms-3'>{modalvalues.fromDate}</p>
            </>
            :
            <>
              <strong>Leave period : </strong>
              <p className='ms-3'>{modalvalues.fromDate} to {modalvalues.toDate}</p>
            </>}
        </div>
        <div className='flex mt-2 '>
          {modalvalues.status === "Pending" ?
            <>
              <button onClick={() => handleApprove(modalvalues.registerId, modalvalues.id)} className='btn bg-green-500 text-white px-4 py-2 rounded-md mr-3'>Approve</button>
              <button onClick={() => RejectReasonModalClick(modalvalues.registerId, modalvalues.id)} className='btn bg-red-500 text-white px-4 py-2 rounded-md'>Reject</button>
            </>
            :
            <>
              <strong>Status :</strong>
              <p className='ms-3'>{modalvalues.status}</p>
            </>}
        </div>
        {isReason && (
          <div className='flex mt-1'>
            <strong>Rejection reason :</strong>
            <p className='ms-3'>{modalvalues.reason}</p>
          </div>
        )}
        <div className='flex justify-center mt-3'>
          <strong>Letter</strong>
        </div>
        <p className='mt-1'>{modalvalues.letter}</p>
        <div className='flex justify-center mt-3'>
          <button className='btn bg-green-500 text-white px-4 py-2 rounded-md closebtn' onClick={handleModalClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
        {isRejectModalOpen && (
   <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  z-50">
   <div className="flex items-center justify-center min-h-screen ">
     <div className="modal-contents bg-white shadow-md rounded-md w-2/5 p-8">

      <div className="flex justify-end">
        <i onClick={() => setIsRejectModalOpen(false)} style={{ cursor: "pointer" }} className="fas fa-times">X</i>
      </div>
      <div className="flex justify-center">
        <h5 className="font-bold"><strong>Add rejection reason</strong></h5>
      </div>

      <textarea
        onChange={handleReasonChange}
        value={formValue.reason}
        className="w-full rounded-lg border-black border mt-3 p-2"
        placeholder="Type here"
        name="reason"
        type="text"
        style={{ height: "150px", resize: "none", position: "relative", zIndex: "1" }}
      >
      </textarea>

      <button
        onClick={(e) => handleReject(e, rejectmodalValues.registerId, rejectmodalValues.id)}
        type="submit"
        className=" flex justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-2/2 mt-4"
      >
        Reject application
      </button>

    </div>
    </div>
  </div>
)}

</>


      )


    }
  }
]

  return (
    <div className="mr-8">
    <BaseTable
    columns={columns}
    data={leaveData}
    title={<h1 className="font-semibold text-2xl">Leave Application</h1>}
    // subHeader
    // subHeaderComponent={
    //     <input
    //         type="text"
    //         placeholder="Search"
    //         className="w-1/4 h-10 p-4 border-2 border-gray-400 rounded-md my-3 "
    //         value= {search}
    //         onChange={(e) => setsearch(e.target.value)}
    //     />
    // }
   
    
/>
</div>
  )
}

export default StudentLeaveApplication;
