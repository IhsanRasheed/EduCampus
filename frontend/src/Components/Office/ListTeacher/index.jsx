import React, {useEffect, useState} from 'react'
import BaseTable from '../../Common/BaseTable'
import { listTeachersAPI } from '../../../Services/OfficeService'
import { Link } from 'react-router-dom'

function ListTeacher() {
    const [data, setData] = useState([]);
    const [search, setsearch] = useState("");
    const [filterData, setFilterData] = useState([]);


useEffect( () => {

    listTeachersAPI().then((resp) => {
        if(resp.data.teachers){
            setData(resp.data.teachers)
            setFilterData(resp.data.teachers)
        }else {
            console.log(resp)
        }
    })

},[])

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
            <h1 className="bg-red-600 p-1 text-white text-base font-semibold rounded-lg">BLOCK</h1>
        ),
    },
    {
        name: "View",
        cell: (row) => (
            <img src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg" alt="Manage" width="24" height="24" />
          ),
    },
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