import {Route, Routes} from 'react-router-dom'
import Home from '../Pages/Teacher/Home'
import TeacherVerification from '../Verification/TeacherVerifiction'


function TeacherRoutes() {
  return (
    <Routes>

        <Route path='/home' element={<TeacherVerification><Home /></TeacherVerification>}></Route>

        
    </Routes>
  )
}

export default TeacherRoutes