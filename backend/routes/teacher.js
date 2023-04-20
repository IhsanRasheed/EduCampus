const { Router } = require('express')
const express = require('express')
const teacherRouter = express()
const teacherController = require('../controllers/teacher')
const verify = require('../middleware/Authorization')
const teacher = require('../models/teacher')

teacherRouter.post('/login',teacherController.login )

teacherRouter.post('/forgot-password', teacherController.forgot)

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

teacherRouter.get('/mark-data/:id', verify.tokenTeacher, teacherController.getMarkDetails)

teacherRouter.get('/attendance-data/:id', verify.tokenTeacher, teacherController.getAttendanceDetails)

teacherRouter.post('/letter', verify.tokenTeacher, teacherController.teacherLetter)

teacherRouter.get('/leave-history', verify.tokenTeacher, teacherController.getLeaveHistory)

teacherRouter.get('/student-leaves', verify.tokenTeacher, teacherController.studentLeaves)

teacherRouter.patch('/leave-approve', verify.tokenTeacher, teacherController.studentLeaveApprove)

teacherRouter.patch('/leave-reject', verify.tokenTeacher, teacherController.studentLeaveReject)


module.exports = teacherRouter