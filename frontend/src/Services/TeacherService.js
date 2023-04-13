import axios from "../axios";

export const teacherLoginAPI = (data) => {
    return axios.post('/teacher/login', data) 
}

export const getHomeAPI = (headers) => {
    return axios.get('/teacher/home', headers)
}

export const getMyStudentsAPI = (headers) => {
    return axios.get('/teacher/my-students', headers)
}

export const eachStudentAPI = (id,headers) => {
    return axios.get(`/teacher/each-student/${id}`,headers)
}

export const availableMonthAPI = (headers) => {
    return axios.get('/teacher/available-month', headers)
}

export const getBatchAPI = (headers) => {
    return axios.get('/teacher/my-batch', headers)
}

export const getBatchPerformanceAPI = (headers) => {
    return axios.get('/teacher/batch-performance', headers)
}

export const batchStartEndAPI = (headers) => {
    return axios.get('/teacher/start-end', headers)
}

export const getMonthlyWorkDaysAPI = (headers) => {
    return axios.get('/teacher/month-work-days',headers)
}

export const postWorkingDaysAPI = (data, headers) => {
    return axios.post('/teacher/add-working-days', data, headers)
}

export const getBatchSubjectsAPI = (batchId, headers) => {
    return axios.get(`/teacher/batch-subjects/${batchId}`, headers)
}

export const postStudentAttendanceAPI = (data,headers) => {
    return axios.post('/teacher/add-attendance',data, headers)
}

export const addMarkAPI = (data,headers) => {
    return axios.post('/teacher/add-marks', data, headers)
}