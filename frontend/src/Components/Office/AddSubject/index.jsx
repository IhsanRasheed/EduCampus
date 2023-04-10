import React, { useState } from "react";
import { addSubjectAPI } from "../../../Services/OfficeService";
import { toast } from "react-toastify";

function SubjectAdd({ visible, onClose, reload }) {
  const [data, setData] = useState({
    subject: "",
  });

  const handleClick = async (e) => {
    const regex = /\d/; // regular expression to check if there are any digits
    if (regex.test(data.subject)) {
      toast("Subject cannot contain numbers");
    } else {
      const headers = {
        headers: {
          Authorization: localStorage.getItem("officeToken"),
        },
      };

      addSubjectAPI(data, headers)
        .then((response) => {
          onClose();
          reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-2 rounded w-96 m-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
            Add Subject
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col  p-5">
          <input
            type="text"
            name="subject"
            className="border border-gray-700 p-2 rounded mb-5"
            value={data.text}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="text-center p-5">
          <button
            className="px-5 py-2 bg-gray-700 text-white rounded"
            onClick={() => handleClick()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubjectAdd;
