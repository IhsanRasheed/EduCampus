import {Route, Routes} from 'react-router-dom'
import Login from '../Pages/Office/Login'
import OfficeHome from '../Pages/Office/Home'
import AddStudent from '../Pages/Office/AddStudent'
import AddBatch from '../Pages/Office/AddBatch'
import AddTeacher from '../Pages/Office/AddTeacher'
import ListBatch from '../Pages/Office/ListBatch'
import ListTeacher from '../Pages/Office/ListTeacher'
import ListStudent from '../Pages/Office/ListSudent'
import ListSubject from '../Pages/Office/ListSubject'
import EachBatch from '../Pages/Office/EachBatch'
import OfficeVerification from '../Verification/OfficeVerification'
import EditBatch from '../Pages/Office/EditBatch'
import Payments from '../Pages/Office/Payments'


function OfficeRoutes() {
  return (
    <Routes>


        <Route path='/login' element={<Login />}></Route>

        <Route path='/home' element={<OfficeHome />}></Route>

        <Route path='/add-student' element={<OfficeVerification><AddStudent /></OfficeVerification>} ></Route>

        <Route path='/add-batch' element={<OfficeVerification><AddBatch /></OfficeVerification>} ></Route>

        <Route path='/add-teacher' element={<OfficeVerification><AddTeacher /></OfficeVerification>} ></Route>

        <Route path='/batches' element={<OfficeVerification><ListBatch /></OfficeVerification>}></Route>

        <Route path='/teachers' element={<OfficeVerification><ListTeacher /></OfficeVerification>}></Route>

        <Route path='/students' element={ <OfficeVerification><ListStudent /> </OfficeVerification>}></Route>

        <Route path='/each-batch' element={ <OfficeVerification><EachBatch /></OfficeVerification>}></Route>

        <Route path='/subjects' element={<OfficeVerification><ListSubject /></OfficeVerification>}></Route>

        <Route path='/edit-batch' element={<OfficeVerification><EditBatch /></OfficeVerification>}></Route>

        <Route path='/payments' element={<OfficeVerification><Payments /></OfficeVerification>}></Route>


    </Routes>
    
    
  )
}

export default OfficeRoutes