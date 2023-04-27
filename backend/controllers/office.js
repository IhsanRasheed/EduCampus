const bcrypt = require("bcrypt");
const mailer = require("../config/nodeMailer");
const student = require("../models/student");
const batch = require("../models/batch");
const subject = require('../models/subject')
const teacher = require("../models/teacher");
const payment = require("../models/payment")
const helpers = require("../helpers/helpers");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
require("dotenv").config();

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (
    process.env.officeEmail === email &&
    process.env.officePassword === password
  ) {
    const payload = {
      email: email,
    };
    jwt.sign(
      payload,
      process.env.OFFICE_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) console.error("There is something in token", err);
        else {
          res.json({
            status: true,
            email,
            token: `Bearer ${token}`,
          });
        }
      }
    );
  } else {
    errors = "Incorrect email or Password";
    res.json({ errors });
  }
};

const addStudent = async (req, res, next) => {
  const data = req.body;

  const registerId = await helpers.uniqueCodeGenerator("student");

  const image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  const generatePassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const password = generatePassword(8);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {

    const batchFee = await batch.aggregate([
      {
          $match: {
              registerId: data.batch
          }
      },
      {
          $project: {
              _id: 0,
              fee: 1
          }
      }
  ])

    await student.create({
      registerId: registerId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      education: data.education,
      institute: data.institute,
      university: data.university,
      batch: data.batch,
      password: hashedPassword,
      pendingFee: batchFee[0].fee,
      image: image,
      address: {
        house_name: data.house_name,
        place: data.place,
        post: data.post,
        pin: data.pin,
        district: data.district,
        state: data.state,
      },
    });
    await batch.updateOne(
      {
          registerId: data.batch
      },
      {
          $inc: { batchFill: 1 }
      }
  )

    let mailDetails = {
      from: process.env.nodemailerEmail,
      to: data.email,
      subject: "Educampus username and password",
      html: `<p>Your user name and password for the Educampus Login purpose are: <strong>Username<strong/> - <strong>${registerId}<strong/> and Password -  <strong>${password}<strong/></p>`,
    };
    mailer.passMailer.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("password mailed");
      }
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const addBatch = async (req, res, next) => {
  const data = req.body;
  const batchId = await helpers.uniqueCodeGenerator("batch");

  await teacher.updateOne(
    { registerId: data.headOfTheBatch },
    {
      $set: {
        myBatch: batchId,
      },
    }
  );

  const startDate = new Date(data.startDate);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + parseInt(data.duration),
    startDate.getDate()
  );

  batch
    .create({
      registerId: batchId,
      startDate: data.startDate,
      endDate: endDate,
      duration: data.duration,
      fee: data.fee,
      numberOfSeat: data.numberOfSeat,
      headOfTheBatch: data.headOfTheBatch,
      remarks: data.remarks,
      subjects: data.subjectValues,
    })
    .then(() => {
      res.json({ status: true });
    });
};

const addTeacher = async (req, res, next) => {
  const data = req.body;
  const registerId = await helpers.uniqueCodeGenerator("teacher");
  const image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  const generatePassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const password = generatePassword(8);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(data)

  try {
    await teacher.create({
      registerId: registerId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      salary: data.salary,
      qualification: data.qualification,
      experience: data.experience,
      image: image,
      password: hashedPassword,
      address: {
        house_name: data.house_name,
        place: data.place,
        post: data.post,
        pin: data.pin,
        district: data.district,
        state: data.state,
      },
    });

    let mailDetails = {
      from: process.env.nodemailerEmail,
      to: data.email,
      subject: "Educampus username and password",
      html: `<p>Your user name and password for the Educampus Login purpose are: <strong>Register Id<strong/> - <strong>${registerId}<strong/> and Password -  <strong>${password}<strong/></p>`,
    };
    mailer.passMailer.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("password mailed");
      }
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const getAvailableTeachers = async (req, res, next) => {
  try {
    const teachers = await teacher.find({ myBatch: "" });
    const allTeachers = await teacher.find();
    res.json({
      status: true,
      teachers,
      allTeachers,
    });
  } catch (err) {
    next(err);
  }
};

const listBatches = async (req, res, next) => {
  try {
    const batchData = await batch.aggregate([
      {
        $lookup: {
          from: "teachers",
          localField: "headOfTheBatch",
          foreignField: "registerId",
          as: "teacher_data",
        },
      },
    ]);
    res.json({
      status: true,
      batches: batchData,
    });
  } catch (err) {
    next(err);
  }
};

const listTeachers = async (req, res, next) => {
  try {
    const teachers = await teacher.find();
    res.json({
      status: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};

const listStudents = async (req, res, next) => {
  try {
    const students = await student.find();
    res.json({
      status: true,
      students,
    });
  } catch (err) {
    next(err);
  }
};

const getBatch = async (req, res, next) => {
  const batchId = req.params.id;
  try {
    const batchStudent = await student.find({ batch: batchId });
    const batchData = await batch.aggregate([
      {
        $match: {
          registerId: batchId,
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "headOfTheBatch",
          foreignField: "registerId",
          as: "teacher_data",
        },
      },
    ]);
    const numberOfSeat = batchData[0].numberOfSeat;
    const batchFill = batchData[0].batchFill;
    const availableSeat = numberOfSeat - batchFill;
    res.json({
      status: true,
      batchStudent,
      batchData,
      availableSeat,
    });
  } catch (err) {
    next(err);
  }
};

const getAvailableBatches = async (req, res, next) => {
  try {
    const availableBatches = await batch.find({
      $expr: {
        $lt: ["$batchFill", "$numberOfSeat"],
      },
    });
    res.json({
      status: true,
      availableBatches,
    });
  } catch (err) {
    next(err);
  }
};

const addSubject = async(req, res, next) => {
  try{
    const data = req.body
    await subject.create({
      subject: data.subject
    })
    res.json({
      status: true
    })
  }catch(err) {
    next(err)
  }
}

const listSubjects = async(req, res, next) => {
  try{
    const subjects = await subject.find()
    res.json({
      status: true,
      subjects
    })
    

  }catch(err){
    next(err)
  }
}

const getAvailableSubjects = async(req, res, next) => {
  try{
    const subjects = await subject.find({isBlocked: false})
    res.json({
      status: true,
      subjects
    })

  }catch(err){
    next(err)
  }
}

const getEditBatch = async(req, res, next) => {
  const id  = req.params.id
  const objectId = new mongoose.Types.ObjectId(id)

  try{
    const batchData = await batch.aggregate([
      {
        $match: {
          _id: objectId
        }
      },
      {
        $lookup: {
          from: 'teachers',
          localField: 'headOfTheBatch',
          foreignField: 'registerId',
          as: 'teacher_data'
        }
      },
      {
        $project: {
          numberOfSeat: 1,
          remarks: 1,
          subjects: 1,
          batchHeadId: '$headOfTheBatch',
          headOfTheBatch: { $arrayElemAt: ['$teacher_data.name',0]}
        }
      }
    ])


    const teachers = await teacher.aggregate([
      {
         $match: {}
      },
      {
        $project: {
          name: 1,
          registerId: 1
        }
      }
    ])

    const availableTeachers = await teacher.aggregate([
      {
        $match: { myBatch: ''}
      },
      {
        $project: {
          name: 1,
          registerId: 1
        }
      }
    ])

    res.json({
      status: true,
      batchData,
      teachers,
      availableTeachers
    })

  }catch(err){
    next(err)
  }
}

const patchEditBatch = async (req, res, next) => {

  const id = req.params.id
  const data = req.body

  const batchData = await batch.findOne({ _id: id })

  if (batchData.headOfTheBatch !== data.batchHeadId) {
      try {
          await teacher.updateOne(
              {
                  myBatch: batchData.registerId
              },
              {
                  $set: {
                      myBatch: ""
                  }
              }

          )
      } catch (err) {
          next(err)
      }
  }
  await teacher.updateOne(

      { registerId: data.batchHeadId },
      {
          $set: {
              myBatch: batchData.registerId,
          }
      }
  )
  try {
      await batch.updateOne(
          { _id: id },
          {
              $set: {
                  numberOfSeat: data.numberOfSeat,
                  remarks: data.remarks,
                  headOfTheBatch: data.batchHeadId,
                  subjects: data.subjectValues
              }
          }
      )
      res.json({ status: true })
  } catch (err) {
      next(err)
  }
}

const blockSubject = async(req, res, next) => {
  const id   = req.params.id
  subject.findByIdAndUpdate(
    {_id: id},
    {isBlocked: true},
    {
      new: true,
      runValidators: true
    },
  ).then((subject)=> {
    res.json({
      status: true,
      subject
    })
  })
}

const unblocksubject = async(req, res, next) => {
  const id = req.params.id
  subject.findByIdAndUpdate(
    {_id: id},
    {isBlocked: false},
    {
      new: true,
      runValidators: true
    },
  ).then((subject)=> {
    res.json({
      status: true,
      subject
    })
  }) 
}

const getPaymentData = async(req, res, next) => {
  try{
    const paymentData = await payment.aggregate([
      {
        $match: {}
      }, 
      {
        $lookup: {
          from: 'students',
          localField: 'registerId',
          foreignField: 'registerId',
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1
              }
            }
          ],
          as: 'studentData'

        }
      },
      {
        $unwind: "$studentData"
      },
      {
        $project: {
          registerId: 1,
          batch: 1,
          amount: 1,
          type: 1,
          status: 1,
          createdAt:1,
          name: "$studentData.name"
        }
      }
    ])
    res.status(200).json({ paymentData })

  }catch(err){
    next(err)
  }
}

const getDashboardData = async (req, res, next) => {
  try{
    const studentsCount = await student.countDocuments()
    const batchCount = await batch.countDocuments()
    const teacherCount = await teacher.countDocuments()

    const activeBatchesTotalFee = await batch.aggregate([
                
      {
          $match: {
              endDate: { $gte: new Date() }
          }
      },
      {
          $project: {
              _id: 0,
              total: { $multiply: ["$batchFill", "$fee"] }
          }
      },
      {
          $group: {
              _id: null,
              total: { $sum: "$total" }
          }
      }
  ])

    const totalPaidAmount = await payment.aggregate([
      {
        $match: {
          status: "Paid"
        }
      },
      {
        $group: {
          _id: null, 
          total: { $sum: '$amount'}
        }
      }
    ])

    const feeCompletionRate = ((totalPaidAmount[0].total/ activeBatchesTotalFee[0].total) * 100).toFixed(2)

    const batchData = await batch.aggregate([
      {
          $project:{
              _id:0,
              batch:"$registerId",
              students:"$batchFill",
              seats:"$numberOfSeat"
          }
      }
  ])
  const teacherData = await teacher.aggregate([
      {
          $project:{
              _id:0,
              name:1,
              salary:1,
              experience:1
          }
      }
  ])
  res.json({
    studentsCount, batchCount, teacherCount, feeCompletionRate,batchData,teacherData
})

  }catch(err){
    next(err)
  }
}

module.exports = {
  addStudent,
  login,
  addBatch,
  addTeacher,
  getAvailableTeachers,
  listBatches,
  listTeachers,
  listStudents,
  getBatch,
  getAvailableBatches,
  addSubject,
  listSubjects,
  getAvailableSubjects,
  getEditBatch,
  patchEditBatch,
  blockSubject,
  unblocksubject,
  getPaymentData,
  getDashboardData
};
