import {Route, Routes} from 'react-router-dom'
import Home from '../Pages/Teacher/Home'
import TeacherVerification from '../Verification/TeacherVerification'
import MyStudent from '../Pages/Teacher/MyStudent'
import EachStudent from '../Pages/Teacher/EachStudent'
import MyBatchPage from '../Pages/Teacher/MyBatch'


function TeacherRoutes() {
  return (
    <Routes>

        <Route path='/home' element={<TeacherVerification><Home /></TeacherVerification>}></Route>

        <Route path='/my-students' element={<TeacherVerification><MyStudent /></TeacherVerification>}></Route>

        <Route path='/each-student' element={<TeacherVerification><EachStudent /></TeacherVerification>}></Route>

        <Route path='/my-batch' element={<TeacherVerification><MyBatchPage /></TeacherVerification>}></Route>

        
    </Routes>
  )
}

export default TeacherRoutes