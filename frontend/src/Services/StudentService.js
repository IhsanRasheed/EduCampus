import axios from "../axios";

export const studentLoginAPI = (data) => {
    return axios.post('/student/login', data) 
}