const { Router } = require('express')
const express = require('express')
const teacherRouter = express()
const teacherController = require('../controllers/teacher')
const verify = require('../middleware/Authorization')
const teacher = require('../models/teacher')

teacherRouter.post('/login',teacherController.login )

teacherRouter.get('/home', verify.tokenTeacher, teacherController.getHome)

teacherRouter.get('/my-students', verify.tokenTeacher, teacherController.getMyStudents)

teacherRouter.get('/each-student/:id', verify.tokenTeacher, teacherController.eachStudent)

teacherRouter.get('/available-month', verify.tokenTeacher, teacherController.availableMonth)

teacherRouter.get('/my-batch', verify.tokenTeacher, teacherController.getMyBatch)

teacherRouter.get('/batch-performance', verify.tokenTeacher, teacherController.getBatchPerformance)

teacherRouter.get('/start-end', verify.tokenTeacher, teacherController.batchStartEndDate)

teacherRouter.get('/month-work-days', verify.tokenTeacher, teacherController.montlyWorkDays)

teacherRouter.post('/add-working-days', verify.tokenTeacher, teacherController.addWorkingDays)

teacherRouter.get('/batch-subjects/:id', verify.tokenTeacher, teacherController.getBatchSubjects)

teacherRouter.post('/add-attendance', verify.tokenTeacher, teacherController.addAttendance)

teacherRouter.post('/add-marks', verify.tokenTeacher, teacherController.addStudentMark)


module.exports = teacherRouter