import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BaseTable from "../../Common/BaseTable";
import { handleGetStudentAPI } from "../../../Services/OfficeService";

function EachBatch() {
  const [students, setStudents] = useState([]);
  const [search, setsearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const batch = location.state.batch;
  const startDate = location.state.batch[0].startDate;
  const DateStart = new Date(startDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const readableStartDate = DateStart.toLocaleDateString("en-US", options);
  const batchId = location.state.batch[0]._id;

  const handleClick = () => {
    console.log(batchId)
    navigate('/office/edit-batch',{
      state: {
        id: batchId
      }
    })
  };

  useEffect(() => {
    setStudents(location.state.students);
  }, []);


  // const handleGetStudent = async (id) => {
  //   const headers = {
  //     headers: {
  //       Authorization: localStorage.getItem("officeToken"),
  //     },
  //   };
  //   handleGetStudentAPI(id, headers).then((response) => {
  //     console.log("ethi");
  //     if (response.data.status) {
  //     }
  //   });
  // };



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
            <img src="https://res.cloudinary.com/dgmz2jv6j/image/upload/v1680585943/EduCampus/Office/export_vijvto.svg" alt="Manage" width="24" height="24" />
          ),
    },
];


useEffect(() => {
  const result = students.filter((item) => {
      return item.name.toLowerCase().match(search.toLowerCase());
  });
  setFilterData(result);
}, [search]);


  return (
    <div className="p-8 w-screen">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-2xl">Each Batch</h1>
        <button className=" bg-blue-500 h-10 shadow text-white text-base font-semibold  px-4 py-2 rounded-md" onClick={handleClick}>
          Edit Batch
        </button>
      </div>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="col-span-1 ">
            <div className="bg-white shadow-2xl rounded-lg p-8 ">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Batches
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Teachers
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Students
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">1</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <div className="flex justify-between items-end">
                <div className="me-2">
                  <p className="text-xl text-gray-600 uppercase leading-4">
                    Active Batches
                  </p>
                </div>
                <p className="text-green-400 text-2xl leading-none mb-0">2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h1 className="font-semibold text-2xl mt-8">Details of the Batch</h1>
      <div className="container-fluid  max-w-7xl mx-4 mt-4 shadow-xl">
        <div className="flex flex-col md:flex-row justify-evenly mb-4  py-2 text-lg">
          <div className="px-4 h-full">
            <div className="flex flex-wrap gap-x-32 gap-y-16 mt-3 mt-md-5 mb-4">
              <div>
                <span className="font-bold text-base mb-0">Batch</span>
                <br />
                <span className="text-muted text-base text-gray-600">
                  {batch[0].registerId}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">
                  Head of the Batch
                </span>
                <br />
                <span className="text-muted text-base text-gray-600 ">
                  {batch[0]?.teacher_data[0]?.name} ({batch[0].headOfTheBatch})
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">
                  Number of Students
                </span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0].batchFill}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Total Seats</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0].numberOfSeat}
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
                  {batch[0].duration}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Course fee</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0].fee}
                </span>
                <br />
              </div>
              <div>
                <span className="font-bold text-base mb-0">Remarks</span>
                <br />
                <span className="text-muted text-base text-gray-600 mt-0">
                  {batch[0].remarks}
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
                    {batch[0].subjects.map((obj, i) => {
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

      <BaseTable
      columns={columns}
      data={students}
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
  );
}

export default EachBatch;
