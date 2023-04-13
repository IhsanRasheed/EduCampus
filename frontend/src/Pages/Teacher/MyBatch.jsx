import React from "react";
import TeacherNav from "../../Components/Teacher/TeacherNav";
import MyBatch from "../../Components/Teacher/MyBatch";
import AddWorkingDays from "../../Components/Teacher/AddWorkingDays";

function MyBatchPage() {
  return (
    <div>
      <TeacherNav />
      <div className="mt-24"> </div>
        <MyBatch />  
      <AddWorkingDays/>
    </div>
  );
}

export default MyBatchPage;
