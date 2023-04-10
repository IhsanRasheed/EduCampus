import { combineReducers } from 'redux'
import teacherReducer from './TeacherReducer'
import studentReducer from './StudentReducer'

const reducers = combineReducers({
    teacherData: teacherReducer,
    studentData: studentReducer

})


export default reducers