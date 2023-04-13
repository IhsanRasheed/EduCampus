import React, { useState, useEffect } from 'react';
import BaseTable from "../../Common/BaseTable";
import AddSubject from '../AddSubject';
import EditSubject from '../EditSubject';
import { listSubjectsAPI, blockSubjectAPI,unBlockSubjectAPI } from '../../../Services/OfficeService'
import Swal from 'sweetalert2'
// import { Link } from 'react-router-dom'

function ListSubject() {

  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [addModal, setAddModal] = useState(false)


  const [editModal, setEditModal] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState('')

  const handleEditOnClose = ()=> setEditModal(false)

  const handleAddOnClose = () => setAddModal(false)
  
  const handleBlock = async(id) => {
    Swal.fire({
      text: "Are you sure you want to block this subject?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'

    }).then((result) =>{
      if(result.isConfirmed){
        const headers = {
          headers: {
          Authorization: localStorage.getItem('officeToken')
          }
        }
       blockSubjectAPI(id, headers).then(() =>{
        const setSubject =  data.filter((obj) => {
          if(obj._id === id) {
            obj.isBlocked = true;
          }
          return obj
        })
        setData(setSubject)
       })
      }
    })
  }

  const handleUnBlock = async(id) => {
    console.log(id)
    Swal.fire({
      text: "Are you sure you want to unblock this subject?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'

    }).then((result) => {
      if(result.isConfirmed){
        const headers = {
          headers: {
            Authorization: localStorage.getItem('officeToken')
          }
        }

        unBlockSubjectAPI(id, headers).then(() =>{
          const setSubject =  data.filter((obj) => {
            if(obj._id === id) {
              obj.isBlocked = false;
            }
            return obj
          })
          setData(setSubject)
         })
        }
    
    })
    
  }

  const fetchData = async () => {
    const headers = {
      headers: {
      Authorization: localStorage.getItem('officeToken')
      }
    }
    listSubjectsAPI(headers).then((response) => {
      if(response.data.status){
        setData(response.data.subjects)
        setFilterData(response.data.subjects)
      }
    })
  };

  useEffect(() => {
    fetchData()
  },[])

  const columns = [
   {
        name: "Sl No.",
        cell: (row, index) => <div>{index + 1}</div>,
        
      },
    {
      name: "Name",
      selector: (row) => row.subject,
    },
    {
      name: "Manage",
      cell: (row) => (

        row.isBlocked === false?
          <button  onClick={() => handleBlock(row._id)} className="bg-red-600 p-1 text-white text-base font-semibold rounded-lg">BLOCK</button>
         :
         <button  onClick={() => handleUnBlock(row._id)} className="bg-green-600 p-1 text-white text-base font-semibold rounded-lg">UNBLOCK</button>

      )

    },
//   {
//     name: "Edit",
//     cell: (row) => (
//       <img
//       className="hover:cursor-pointer"
//         src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg"
//         alt="Manage"
//         width="24"
//         height="24"
//         onClick={()=>
//           setEditModal(true)
//         }
       
//       />
//       ),
// },
  ]

  useEffect(() => {
    const result = data.filter((item) => {
        return item.subject.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [data,search]);

  return (
    <>
    
    <BaseTable
    columns={columns}
    data={filterData}
    title={<h1 className="font-semibold text-4xl">Subjects</h1>}
    subHeader
    subHeaderComponent={
      <input
        type="text"
        placeholder="Search"
        className="w-1/4 h-10 p-4 border-2 border-gray-400 rounded-md my-3 "
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
    }
    actions={
      <button
        className="bg-blue-500 h-10 shadow text-white text-base font-semibold px-4 py-2 rounded-md"
        onClick={()=>{
          setAddModal(true)
        }} 
      >
        Add Subject
      </button>
    }

  />

<AddSubject onClose={handleAddOnClose} visible={addModal} reload={fetchData} />
{/* <EditSubject onClose={handleEditOnClose} visible={editModal} reload={fetchData}  data={name} id={id}/> */}
   

  </>
  
  )
}

export default ListSubject