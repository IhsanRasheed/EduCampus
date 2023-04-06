import {Route, Routes} from 'react-router-dom'
import Login from '../Pages/Office/Login'
import OfficeHome from '../Pages/Office/Home'
import AddStudent from '../Pages/Office/AddStudent'
import AddBatch from '../Pages/Office/AddBatch'
import AddTeacher from '../Pages/Office/AddTeacher'
import ListBatch from '../Pages/Office/ListBatch'
import ListTeacher from '../Pages/Office/ListTeacher'
import ListStudent from '../Pages/Office/ListSudent'
import EachBatch from '../Pages/Office/EachBatch'


function OfficeRoutes() {
  return (
    <Routes>


        <Route path='/login' element={<Login />}></Route>

        <Route path='/home' element={<OfficeHome />}></Route>

        <Route path='/add-student' element={<AddStudent />} ></Route>

        <Route path='/add-batch' element={<AddBatch />} ></Route>

        <Route path='/add-teacher' element={<AddTeacher />} ></Route>

        <Route path='/batches' element={<ListBatch />}></Route>

        <Route path='/teachers' element={<ListTeacher />}></Route>

        <Route path='/students' element={ <ListStudent /> }></Route>

        <Route path='/each-batch' element={ <EachBatch />}></Route>


    </Routes>
    
    
  )
}

export default OfficeRoutes