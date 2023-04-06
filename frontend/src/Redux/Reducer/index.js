import { combineReducers } from 'redux'
import teacherReducer from './TeacherReducer'

const reducers = combineReducers({
    teacherData: teacherReducer

})

export default reducers