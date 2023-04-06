const bcrypt = require("bcrypt");
const mailer = require("../config/nodeMailer");
const student = require("../models/student");
const batch = require("../models/batch");
const teacher = require("../models/teacher");
const helpers = require("../helpers/helpers");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res, next) => {
  const createToken = (data) => {
    return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };
  const email = req.body.email;
  const password = req.body.password;

  if (
    process.env.officeEmail === email &&
    process.env.officePassword === password
  ) {
    const token = createToken(email);
    res
      .status(200)
      .json({ message: "Admin login successful", token, status: true });

    // res.json({ status: true, email });
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
    await student.create({
      registerId: registerId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      education: data.education,
      institute: data.institute,
      batch: data.batch,
      password: hashedPassword,
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
    const numberOfSeat = batchData[0].numberOfSeat
    const batchFill = batchData[0].batchFill  
    const availableSeat = numberOfSeat - batchFill
    res.json({
      status: true,
      batchStudent,
      batchData,
      availableSeat
    })

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
};
