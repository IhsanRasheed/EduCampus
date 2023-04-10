const { Router } = require('express')
const express = require('express')
const studentRouter = express()
const studentController = require('../controllers/student')
const verify = require('../middleware/Authorization')

studentRouter.post('/login',studentController.login)

studentRouter.get('/home', verify.tokenStudent, studentController.getHome)


module.exports = studentRouter