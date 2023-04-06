import axios from '../axios'

export const addStudentAPI = (data,headers) => {
    return axios.post('/office/add-student', data ,headers)
}

export const officeLoginAPI = (data) => {
    return axios.post('/office/login', data)
}

export const addBatchAPI = (data) => {
    return axios.post('/office/add-batch', data)
}

export const addTeacherAPI = (data,headers) => {
    return axios.post('/office/add-teacher', data,headers)
}

export const availableTeachersAPI = () => {
    return axios.get('/office/available-teachers')
}

export const listBatchesAPI = () => {
    return axios.get('/office/batches')
}

export const listTeachersAPI = () => {
    return axios.get('/office/teachers')
}

export const listStudentsAPI = () => {
    return axios.get('/office/students')
}

export const getBatchAPI = (id) => {
    return axios.get(`/office/get-batch/${id}`)
}

export const availableBatchesAPI = () => {
    return axios.get('/office/available-batches')
}