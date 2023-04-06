import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import OfficeRoutes from "./Routes/OfficeRoutes";
import StudentRoutes from "./Routes/StudentRoutes";
import TeacherRoutes from "./Routes/TeacherRoutes";
import CommonRoutes from "./Routes/CommonRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<CommonRoutes />}></Route>
          <Route path="/office/*" element={<OfficeRoutes />} />
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route path="/teacher/*" element={<TeacherRoutes />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
