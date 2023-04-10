import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEditBatchAPI, editBatchAPI } from "../../../Services/OfficeService";

function EditBatch() {
  const navigate = useNavigate();
  const location = useLocation();
  const batchId = location.state.id;
  const [teachers, setTeachers] = useState([{ name: "", registerId: "" }]);
  const [availableTeachers, setAvailableTeachers] = useState([
    { name: "", registerId: "" },
  ]);
  const [batchData, setBatchData] = useState({
    numberOfSeat: "",
    remarks: "",
    headOfTheBatch: "",
    batchHeadId: "",
  });
  console.log(batchData);

  const [subjectValues, setSubjectValues] = useState([
    { subject: "", teacher: "" },
  ]);

  useEffect(() => {
    const id = location.state.id;
    const headers = {
      headers: {
        Authorization: localStorage.getItem("officeToken"),
      },
    };

    getEditBatchAPI(id, headers).then((response) => {
      setTeachers(response.data.teachers);
      setAvailableTeachers(response.data.availableTeachers);
      const batchData = { ...response.data.batchData[0] };
      const subjectVaues = response.data.batchData[0].subjects;
      setBatchData(batchData);
      setSubjectValues(subjectVaues);
    });
  }, [batchId]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBatchData({ ...batchData, [name]: value });
  };

  const handleTeacherChange = (e, index) => {
    const values = [...subjectValues];
    const updatedSubject = values.map((subject, i) => {
      if (i === index) {
        return { ...subject, teacher: e.target.value };
      }
      return subject;
    });
    setSubjectValues(updatedSubject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      subjectValues,
      ...batchData,
    };
    const headers = {
      headers: {
        Authorization: localStorage.getItem("officeToken"),
      },
    };
    editBatchAPI(batchId, data, headers).then((response) => {
      if (response.data.status) {
        navigate("/office/batches");
      }
    });
  };

  return (
    <section className=" py-1 bg-blueGray-50 mt-4 ">
      <div className="w-full lg:w-full px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Edit Batch
              </h6>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block text-gray-600 font-normal mb-2">
                      Number of Seats
                    </label>
                    <input
                      type="number"
                      name="numberOfSeat"
                      value={batchData.numberOfSeat}
                      onChange={handleChange}
                      className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block text-gray-600 font-normal mb-2">
                      Batch Head
                    </label>
                    <select
                      onChange={handleChange}
                      className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      name="batchHeadId"
                      id="batchHeadId"
                    >
                      <option value={batchData.batchHeadId}>
                        {batchData.headOfTheBatch}
                      </option>
                      {availableTeachers.map((obj, index) => {
                        return (
                          <option key={index} value={obj.registerId}>
                            {obj.name} ({obj.registerId})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block text-gray-600 font-normal mb-2">
                      Remarks
                    </label>
                    <input
                      type="text"
                      name="remarks"
                      value={batchData.remarks}
                      onChange={handleChange}
                      className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <p className="font-semibold w-full mt-4 mb-4">Edit Subject</p>

                {subjectValues.map((obj, index) => {
                  return (
                    <div className=" flex ">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <input
                            type="text"
                            name="remarks"
                            value={obj.subject}
                            readOnly
                            className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      :
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <select
                            name="selectVersion"
                            onChange={(e) => handleTeacherChange(e, index)}
                            className="block w-full border border-gray-500 rounded-lg shadow-sm py-2 px-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option defaultValue value={obj.teacher}>
                              {obj.teacher}
                            </option>
                            {teachers.map((obj) => {
                              return (
                                <option value={obj.name}>
                                  {obj.name} ({obj.registerId})
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="submit"
                  className=" bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-2/2 mt-4"
                >
                  Edit Batch
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditBatch;
