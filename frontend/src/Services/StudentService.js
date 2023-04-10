import axios from "../axios";

export const studentLoginAPI = (data) => {
    return axios.post('/student/login', data) 
}

export const getHomeAPI = (headers) => {
    return axios.get('/student/home', headers)
}