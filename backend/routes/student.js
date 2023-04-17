const { Router } = require('express')
const express = require('express')
const studentRouter = express()
const studentController = require('../controllers/student')
const verify = require('../middleware/Authorization')

studentRouter.post('/login',studentController.login)

studentRouter.get('/home', verify.tokenStudent, studentController.getHome)

studentRouter.get('/mark-data', verify.tokenStudent, studentController.getMarkDetails)

studentRouter.get('/attendance-data', verify.tokenStudent, studentController.getAttendanceDetails)

studentRouter.post('/letter', verify.tokenStudent, studentController.studentLetter)

studentRouter.get('/leave-history', verify.tokenStudent, studentController.getLeaveHistory)


module.exports = studentRouter