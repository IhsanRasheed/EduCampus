import React, { useEffect, useState } from "react";
import BaseTable from "../../Common/BaseTable";
import { listBatchesAPI, getBatchAPI } from "../../../Services/OfficeService";
import { Link, useNavigate } from "react-router-dom";

function ListBatch() {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('officeToken')
      }
    }
    listBatchesAPI(headers).then((response) => {
      if (response.data.status) {
        setData(response.data.batches);
        setFilterData(response.data.batches);
      } else {
        console.log(response);
      }
    });
  }, []);

  const handleClick = async (id) => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('officeToken')
      }
    }

    getBatchAPI(id,headers).then((response) => {
      if (response.data.status) {
        navigate("/office/each-batch", {
          state: {
            batch: response.data.batchData,
            availableSeat: response.data.availabelSeat,
            students: response.data.batchStudent,
          },
        })
      }
    })
  };

  const columns = [
    {
      name: "Sl No.",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Id",
      selector: (row) => row.registerId,
      sortable: true,
    },
    {
      name: "Batch Head",
      selector: (row) => row.teacher_data[0]?.name,
    },
    {
      name: "Start Date",
      selector: (row) => {
        const startDate = new Date(row.startDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return startDate.toLocaleDateString("en-US", options);
      },
    },
    {
      name: "Duration",
      selector: (row) => `${row.duration} month`,
    },
    {
      name: "Seats",
      selector: (row) => row.numberOfSeat,
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
    const result = data.filter((item) => {
      return item.registerId.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [data, search]);

  return (
    <BaseTable
      columns={columns}
      data={filterData}
      title={<h1 className="font-semibold text-4xl">Batches</h1>}
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
        <Link to={"/office/add-batch"}>
          <button className="bg-blue-500 h-10 shadow text-white text-base font-semibold  px-4 py-2 rounded-md">
            Add Batch
          </button>
        </Link>
      }
    />
  );
}

export default ListBatch;
