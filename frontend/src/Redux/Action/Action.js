export const storeTeacherData = (teacherData) => {
    return (dispatch)=>{
        dispatch({
            type:"storeTeacherData",
            teacherData:teacherData,
        })
    }
}
export const storeStudentData = (studentData) => {
    return (dispatch)=>{
        dispatch({
            type:"storeStudentData",
            studentData:studentData,
        })
    }
}
