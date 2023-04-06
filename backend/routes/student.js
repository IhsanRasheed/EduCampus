const { Router } = require('express')
const express = require('express')
const studentRouter = express()
const studentController = require('../controllers/student')



studentRouter.post('/login',studentController.login)


module.exports = studentRouter