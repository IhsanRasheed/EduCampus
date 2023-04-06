import axios from "../axios";

export const teacherLoginAPI = (data) => {
    return axios.post('/teacher/login', data) 
}

export const getHomeAPI = (headers) => {
    return axios.get('/teacher/home', headers)
}