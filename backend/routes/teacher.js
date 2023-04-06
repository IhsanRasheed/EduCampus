const { Router } = require('express')
const express = require('express')
const teacherRouter = express()
const teacherController = require('../controllers/teacher')
const verify = require('../middleware/Authorization')

teacherRouter.post('/login',teacherController.login )

teacherRouter.get('/home', verify.tokenTeacher, teacherController.getHome)

module.exports = teacherRouter