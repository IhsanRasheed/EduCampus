import axios from '../axios'

export const officeLoginAPI = (data) => {
    return axios.post('/office/login', data)
}

export const addStudentAPI = (data, headers) => {
    return axios.post('/office/add-student', data ,headers)
}

export const addBatchAPI = (data, headers) => {
    return axios.post('/office/add-batch', data, headers)
}

export const addTeacherAPI = (data, headers) => {
    return axios.post('/office/add-teacher', data, headers)
}

export const availableTeachersAPI = (headers) => {
    return axios.get('/office/available-teachers',headers)
}

export const listBatchesAPI = (headers) => {
    return axios.get('/office/batches', headers)
}

export const listTeachersAPI = (headers) => {
    return axios.get('/office/teachers',headers)
}

export const listStudentsAPI = (headers) => {
    return axios.get('/office/students', headers)
}

export const getBatchAPI = (id, headers) => {
    return axios.get(`/office/get-batch/${id}`,headers)
}

export const availableBatchesAPI = (headers) => {
    return axios.get('/office/available-batches', headers)
}

export const handleGetStudentAPI = (id, headers) => {
    return axios.get(`/office/student/${id}`, headers)
}

export const addSubjectAPI = (data, headers) => {
    return axios.post('/office/add-subject', data, headers)
}

export const listSubjectsAPI = (headers) => {
    return axios.get('/office/subjects', headers)
}

export const availableSubjectsAPI = (headers) => {
    return axios.get('/office/available-subjects', headers)
}

export const getEditBatchAPI = (id,headers) => {
    return axios.get(`/office/get-edit-batch/${id}`, headers)
}

export const editBatchAPI = (id,data,headers) => {
    return axios.patch(`/office/edit-batch/${id}`,data, headers)
}

export const blockSubjectAPI = (id, headers) => {
    return axios.patch(`/office/block-subject/${id}`, headers)
}

export const unBlockSubjectAPI = (id, headers) => {
    return axios.patch(`/office/unblock-subject/${id}`, headers)
}

export const paymentDataAPI = (headers) => {
    return axios.get('/office/payments', headers)
}

export const getDashboarAPI = (headers) => {
    return axios.get('/office/dashboard', headers)
}