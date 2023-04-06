const express = require('express')
const officeRouter = express()

const officeController = require('../controllers/office.js')
const uploadImage = require('../config/cloudinary')
const auth = require('../middleware/adminAuth')

officeRouter.post('/add-student',uploadImage,officeController.addStudent)

officeRouter.post('/login',officeController.login)

officeRouter.post('/add-batch', officeController.addBatch )

officeRouter.post('/add-teacher',uploadImage, officeController.addTeacher)

officeRouter.get('/available-teachers', officeController.getAvailableTeachers)

officeRouter.get('/batches', officeController.listBatches)

officeRouter.get('/teachers', officeController.listTeachers)

officeRouter.get('/students', officeController.listStudents)

officeRouter.get('/get-batch/:id', officeController.getBatch)

officeRouter.get('/available-batches', officeController.getAvailableBatches)

module.exports = officeRouter