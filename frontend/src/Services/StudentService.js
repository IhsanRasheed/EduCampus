import axios from "../axios";

export const studentLoginAPI = (data) => {
    return axios.post('/student/login', data) 
}

export const studentForgotAPI = (data) => {
    return axios.post('/student/forgot-password', data)
}

export const getHomeAPI = (headers) => {
    return axios.get('/student/home', headers)
}

export const getMarkDetailsAPI = (headers) => {
    return axios.get('/student/mark-data', headers)
}

export const getAttendanceAPI = (headers) => {
    return axios.get('/student/attendance-data', headers)
}

export const leaveHistoryAPI = (headers) => {
    return axios.get('/student/leave-history', headers)
}

export const postLetterAPI = (data, headers) => {
    return axios.post('/student/letter', data, headers)
}

export const getFeeDetailsAPI = (batchId, headers) => {
    return axios.get(`/student/get-fee/${batchId}`, headers)
}

export const feePaymentAPI = (batchId, data, headers) => {
    return axios.post(`/student/fee-payment/${batchId}`, data, headers)
}

export const verifyPaymentAPI = (data, headers) => {
    return axios.post('/student/verify-payment', data, headers)
}

export const getPaymentDetailsAPI = (headers) => {
    return axios.get('/student/payment-details', headers)
}
