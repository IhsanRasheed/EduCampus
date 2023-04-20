const bcrypt = require("bcrypt");
const mailer = require("../config/nodeMailer");
const student = require("../models/student");
const batch = require('../models/batch')
const payment = require('../models/payment')
const jwt = require("jsonwebtoken");
// dotenv.config();
const crypto = require('crypto')
const Razorpay = require('razorpay');
const mongoose = require("mongoose");

const login = async (req, res, next) => {
  const data = req.body;

  try {
    const studentData = await student.findOne({ registerId: data.registerId });
    if (studentData) {
      const passwordMatch = await bcrypt.compare(
        data.password,
        studentData.password
      );
      if (passwordMatch) {
        const payload = {
          registerId: data.registerId
        }
        jwt.sign(
          payload,
          process.env.STUDENT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) console.log('There is something error in token', err)
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              })
            }
          }
        )
      } else {
        res.json({
          error: "Invalid Password",
        });
      }
    } else {
      res.json({ error: "Invalid register Id or password" });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgot = async(req, res, next) => {
  const data = req.body
  try{
    const studentData = await student.findOne({ registerId: data.registerId });
    if(studentData) {
      const email = studentData.email
      const registerId = data.registerId      
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
      console.log(hashedPassword)
       const check = await student.updateOne(
        {registerId: data.registerId},
        { $set: { password: hashedPassword } }
        )
        console.log(check)

      let mailDetails = {
        from: process.env.nodemailerEmail,
        to: email,
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

      res.json({
        status: true,
        message: "Password sent to registered email"
      })

    }
   
  }catch(err){
    next(err)
  }
}

const getHome = async (req, res, next) => {
  const id = req.registerId
  try{
    const studentData = await student.find({registerId: id})
    res.json({ studentData })
  }catch(err){
    next(err)
  }
}

const getMarkDetails = async(req, res, next) => {
  const studentId = req.registerId
  try{
    const markDetails = await student.aggregate([
      {
        $match: {
          registerId: studentId
        }
      },
      {
        $project: {
          _id: 0,
          markDetails: 1
        }
      }
    ])
    const sortedMarkDetails  = markDetails[0].markDetails.sort((a,b) => b.month - a.month)
    res.status(200).json({
      markDetails: sortedMarkDetails
    })

  }catch(err){
    next(err)
  }
}

const getAttendanceDetails = async(req, res, next) => {
  const studentId = req.registerId
  try{
    const attendanceDetails = await student.aggregate([
      {
        $match: {
          registerId: studentId
        }
      },
      {
        $project: {
          attendance: 1
        }
      }
    ])
    const attendanceArray = await attendanceDetails[0]?.attendance?.sort ((a,b) => b.month - a.month )
    res.json({
      status: true,
      attendanceData: attendanceArray
    })

  }catch(err){
    next(err)
  }
}

const studentLetter = async(req, res, next) => {
  const id = req.registerId
  const today = new Date()
  const data = {
    appliedDate: today,
    from: req.body.from,
    to: req.body.to,
    letter: req.body.leaveLetter,
    status: "Pending",
    reason: ""
  }
  try{
    await student.updateOne(
      {
        registerId: id
      },
      {
        $push: {
          myLeaves: data
        }
      }
    )
    res.json({
      status: true
    })
  }catch(err){
    next(err)
  }
}

const getLeaveHistory = async(req, res, next) => {
  const id = req.registerId
  try{
    const leaveHistory = await student.aggregate([
      {
        $match: {
          registerId: id
        }
      },{
        $unwind: "$myLeaves"
      },
      {
        $project: {
          myLeaves: 1
        }
      },
      {
        $sort: {
          "myLeaves.appliedDate": -1
        }
      }
    ])
    res.json({
      status: true,
      leaveHistory
    })

  }catch(err){
    next(err)
  }
}

const getFeeDetails = async(req, res, next) => {
  const batchId = req.params.id
  const studentId = req.registerId
  try{
    const courseFee = await batch.aggregate([
      {
        $match: {
          registerId: batchId
        }
      },
      {
        $project: {
          _id: 0,
          fee: 1
        }
      }
    ])

    const pendingFee = await student.aggregate([
      {
        $match: {
          registerId: studentId
        }
      },
      {
        $project: {
          _id: 0,
          pendingFee: 1
        }
      }
    ])
    const installmentAmount = ((courseFee[0].fee) /4).toFixed(2)
    res.status(200).json({
      totalFee: courseFee[0].fee,
      pendingFee: pendingFee[0].pendingFee,
      installmentAmount
    })
  }catch(err){
    next(err)
  }
}

const feePayment = async(req, res, next) => {
  const studentId = req.registerId
  const batchId = req.params.id
  let amountToPay
  try{
    if(req.body.option === 'One time') {
      const pendingFee = await student.aggregate([
        {
            $match: {
                registerId: studentId
            }
        },
        {
            $project: {
                _id: 0,
                pendingFee: 1
            }
        }
    ])
    amountToPay = pendingFee[0].pendingFee


    } else {
      const courseFee = await batch.aggregate([
        {
            $match: {
                registerId: batchId
            }
        },
        {
            $project: {
                _id: 0,
                fee: 1
            }
        }
    ])
    const installmentAmount = ((courseFee[0].fee) / 4).toFixed(2)
    amountToPay = installmentAmount
    }
  }catch(err){
    next(err)
  }
  try{
    const paymentData = await payment.create({
      registerId: studentId,
      batch: batchId,
      amount: amountToPay, 
      status: 'Cancelled',
      type: req.body.option
    })
    const referenceId = paymentData._id
    const instance = new Razorpay({
      key_id: process.env.KEYID,
      key_secret: process.env.KEYSECRET
    })
    let options = {
      amount: amountToPay * 100,  // converting  paise to rupay
      currency: "INR",
      receipt: "" + referenceId
    }
    instance.orders.create(options, function (err, order) {
      if(err) {
        next(err)
      } else{
        res.status(200).json({ order: order})
      }
    })
  }catch(err){
    next(err)
  }

}


const verifyFeePayment = async(req, res, next) => {
  const studentId = req.registerId
  console.log(studentId)
  try{
    const details = req.body
    let hmac = crypto.createHmac("sha256", process.env.KEYSECRET);
    hmac.update(details.payment.razorpay_order_id + "|" + details.payment.razorpay_payment_id);
    hmac = hmac.digest("hex");
    if (hmac == details.payment.razorpay_signature) {
      const receiptId = details.details.order.receipt;
      const objId = new mongoose.Types.ObjectId(receiptId);
      await payment.updateOne(
        {
          _id: objId
        },
        {
          $set: {
            status: "Paid"
          }
        }
      )
      const paidAmount = (details.details.order.amount) / 100
      console.log(paidAmount)
      const fees = await student.updateOne(
        {
            registerId: studentId
        },
        {
            $inc: {
                pendingFee: -paidAmount
            }
        }
    )
      console.log(fees)
      res.status(200).json({message: "Payment verified Successfully"})
    }else{
      res.status(400).json({ message: "Invalid signature"})
    }

  }catch(err){
    next(err)
  }
}


const paymentDetails = async(req, res, next) => {
  const studentId = req.registerId
  try{
    const paymentDetails = await payment.find(
      {
        registerId: studentId,
        status: 'Paid'
      }
    )
    res.status(200).json({
      paymentDetails
    })
  }catch(err){
    next(err)
  }
}



module.exports = {
  login,
  forgot,
  getHome,
  getMarkDetails,
  getAttendanceDetails,
  studentLetter,
  getLeaveHistory,
  getFeeDetails,
  feePayment,
  verifyFeePayment,
  paymentDetails
};
