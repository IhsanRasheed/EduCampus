import React, { useEffect, useState } from 'react'
import BaseTable from '../../Common/BaseTable'
import { useNavigate } from 'react-router-dom'
import { getMyStudentsAPI,eachStudentAPI } from '../../../Services/TeacherService';
import Cookies from "js-cookie";


function MyStudents() {
   
  const [students,setStudents] = useState([])
  const [search, setsearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate()

const handleClick = (id) => {
  const headers = {
    headers: {
      Authorization: Cookies.get('teacherToken')
    }
  }

  eachStudentAPI(id,headers).then((response) => {
    navigate('/teacher/each-student',{
      state: {
        studentData: response.data.student
      }
    })

  })

}


  useEffect(() => {
    const headers = {
      headers: {
        Authorization: Cookies.get('teacherToken')
      }
    }
    getMyStudentsAPI(headers).then((response) => {
      if(response.data.status){
        setStudents(response.data.students)
      }
    })

  },[])

  const columns = [
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
        selector: (row) => row.batch
    },
    {
        name: "Parent",
        selector: (row) => row.parentName,
    },
    {
        name: "Education",
        selector: (row) => row.education,
    },
    
    {
        name: "Manage",
        cell: (row) => (
            <h1 className="bg-red-600 p-1 text-white text-base font-semibold rounded-lg">BLOCK</h1>
        ),
    },
    {
      name: "View",
      cell: (row) => (
        <img
        className="hover:cursor-pointer"
          src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg"
          alt="Manage"
          width="24"
          height="24"
          onClick={() => {
            handleClick(row.registerId);
          }}
        />
      ),
    },
];

useEffect(() => {
  const result = students.filter((item) => {
      return item.name.toLowerCase().match(search.toLowerCase());
  });
  setFilterData(result);
}, [students,search]);



  return (
    <div className='mr-12'>
      <BaseTable
      columns={columns}
      data={filterData}
      title={<h1 className="font-semibold text-2xl">Students    </h1>}
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
  />

    </div>
  )
}

export default MyStudents