import React, {useEffect, useState} from 'react'
import BaseTable from '../../Common/BaseTable'
import { listTeachersAPI,blockTeacherAPI,unBlockTeacherAPI,getTeacherAPI } from '../../../Services/OfficeService'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ListTeacher() {
    const [data, setData] = useState([]);
    const [search, setsearch] = useState("");
    const [filterData, setFilterData] = useState([]);
    const navigate = useNavigate();


  
useEffect( () => {
    const headers = {
        headers: {
          Authorization: localStorage.getItem('officeToken')
        }
      }

    listTeachersAPI(headers).then((resp) => {
        if(resp.data.teachers){
            setData(resp.data.teachers)
            setFilterData(resp.data.teachers)
        }else {
            console.log(resp)
        }
    })

},[])

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
       blockTeacherAPI(id, headers).then(() =>{
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

        unBlockTeacherAPI(id, headers).then(() =>{
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

  const handleClick = async (id) => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('officeToken')
      }
    }

    getTeacherAPI(id,headers).then((response) => {
      if (response.data.status) {
        navigate("/office/each-teacher", {
          state: {
           teacher: response.data.teacher
          },
        })
      }
    })
  };

const columns = [
    // {
    //     name: "Sl No.",
    //     cell: (row, index) => <div>{index + 1}</div>,
        
    //   },
    {
        name: "Id",
        selector: (row) => row.registerId,
        sortable:true
    },
    {
        name: "Name",
        cell: (row) => (
          <div className="flex items-center">
            <img src={row.image[0].url}  alt="" className="w-10 h-10 rounded-full border-3 border-green-900 " />
            <span className="whitespace-nowrap ml-1">{row.name}</span>

          </div>
        ),
      },
    {
        name: "Phone",
        selector: (row) => row.phone,
    },
    {
        name: "Batch",
        selector: (row) => row.myBatch!== "" ? row.myBatch : "No batch assigned"
    },
    {
        name: "Qualification",
        selector: (row) => row.qualification,
    },
    {
        name: "Experience",
        selector: (row) => `${row.experience} yrs`
    },
    {
        name: "Salary",
        selector: (row) => row.salary,
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
      // {
      //   name: "View",
      //   cell: (row) => (
      //     <img
      //     className="hover:cursor-pointer"
      //       src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg"
      //       alt="Manage"
      //       width="24"
      //       height="24"
      //       onClick={() => {
      //         handleClick(row.registerId);
      //       }}
      //     />
      //   ),
      // },
];

useEffect(() => {
    const result = data.filter((item) => {
        return item.name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [data,search]);
  
    return (
      <BaseTable
      columns={columns}
      data={filterData}
      title={<h1 className="font-semibold text-4xl">Teachers</h1>}
      subHeader
      subHeaderComponent={
          <input
              type="text"
              placeholder="Search"
              className="w-1/4 h-10 p-4 border-2 border-gray-400 rounded-md my-3 "
              value= {search}
              onChange={(e) => setsearch(e.target.value)}
          />
      }
      actions={
          <Link to={'/office/add-teacher'}>
              <button className="bg-blue-500 h-10 shadow text-white text-base font-semibold  px-4 py-2 rounded-md">
                  Add Teacher
              </button>
          </Link>
      }
      
  />
    )
  }

export default ListTeacher