const bcrypt = require("bcrypt");
const student = require("../models/student");
const jwt = require("jsonwebtoken");

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

module.exports = {
  login,
  getHome,
  getMarkDetails,
  getAttendanceDetails,
  studentLetter,
  getLeaveHistory
};
