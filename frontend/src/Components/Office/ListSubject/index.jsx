import React, { useState, useEffect } from 'react';
import BaseTable from "../../Common/BaseTable";
import AddSubject from '../AddSubject';
import { listSubjectsAPI } from '../../../Services/OfficeService'
// import { Link } from 'react-router-dom'

function ListSubject() {

  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const handleEditOnClose = ()=> setEditModal(false)


  const handleAddOnClose = () => setAddModal(false)

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
          <h1 className="bg-red-600 p-1 text-white text-base font-semibold rounded-lg">BLOCK</h1>
      ),
  },
  {
    name: "Edit",
    cell: (row) => (
        <img src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg" alt="Manage" width="24" height="24" />
      ),
},
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
        onClick={()=>setAddModal(true)} 
      >
        Add Subject
      </button>
    }

  />

<AddSubject onClose={handleAddOnClose} visible={addModal} reload={fetchData} />
  
  </>
  
  )
}

export default ListSubject