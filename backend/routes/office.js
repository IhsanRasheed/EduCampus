const express = require('express')
const officeRouter = express()

const officeController = require('../controllers/office.js')
const uploadImage = require('../config/cloudinary')
const verify = require('../middleware/Authorization.js')


officeRouter.post('/login',officeController.login)

officeRouter.post('/add-student', verify.tokenOffice, uploadImage,officeController.addStudent)

officeRouter.post('/add-batch', verify.tokenOffice, officeController.addBatch )

officeRouter.post('/add-teacher', verify.tokenOffice,uploadImage, officeController.addTeacher)

officeRouter.get('/available-teachers', verify.tokenOffice, officeController.getAvailableTeachers)

officeRouter.get('/batches', verify.tokenOffice, officeController.listBatches)

officeRouter.get('/teachers', verify.tokenOffice, officeController.listTeachers)

officeRouter.get('/students', verify.tokenOffice, officeController.listStudents)

officeRouter.get('/get-batch/:id', verify.tokenOffice, officeController.getBatch)

officeRouter.get('/available-batches', verify.tokenOffice, officeController.getAvailableBatches)

officeRouter.post('/add-subject', verify.tokenOffice, officeController.addSubject)

officeRouter.get('/subjects', verify.tokenOffice, officeController.listSubjects)

officeRouter.get('/available-subjects', verify.tokenOffice, officeController.getAvailableSubjects)

officeRouter.get('/get-edit-batch/:id', verify.tokenOffice, officeController.getEditBatch)

officeRouter.patch('/edit-batch/:id', verify.tokenOffice, officeController.patchEditBatch)

officeRouter.patch('/block-subject/:id',  officeController.blockSubject)

officeRouter.patch('/unblock-subject/:id',  officeController.unblocksubject)


module.exports = officeRouter