const bcrypt = require("bcrypt");
const teacher = require("../models/teacher")
const student = require('../models/student')
const batch = require('../models/batch')
const jwt = require("jsonwebtoken");
const helpers = require('../helpers/helpers');

const login = async (req, res, next) => {
    const data = req.body

    try{
        const teacherData = await teacher.findOne({registerId: data.registerId})
        if(teacherData) {
            const passwordMatch = await bcrypt.compare(data.password, teacherData.password)
            if(passwordMatch) {
                const payload = {
                    registerId: data.registerId
                }
                jwt.sign(
                    payload,
                    process.env.TEACHER_SECRET,
                    { expiresIn: 3600},
                    (err, token) => {
                        if(err) console.log('There is something error in token', err)
                        else {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            })
                        }

                    }
                )
               
            } else{
                res.json({
                    error: "Invalid Password"
                })
            }
        } else{
            res.json({
                error: "Invalid register Id or password"
            })
        }

    }catch(err) {
        next(err)
    }

}

const forgot = async(req, res, next) => {
    console.log('bakilethi')
}

const getHome = async (req, res, next) => {
    const id = req.registerId
    try{
        const teacherData = await teacher.find({registerId: id})
        res.json({ teacherData })
    }catch(err) {
      next(err)
    }
}

const getMyStudents = async (req, res, next) => {
    const id = req.registerId
    try{
        const teacherData = await teacher.aggregate([
            {
                $match: {
                    registerId: id
                }
            },
            {
                $project: {
                    myBatch: 1
                }
            }
             ])
            if (teacherData[0].myBatch !== "") {
                const batchStudents = await student.find({ batch: teacherData[0].myBatch})
                res.json({
                    status: true,
                    students: batchStudents
                })
            } else{
                res.json({
                    status: false
                })
            }
    }catch(err){
      next(err)
    }
}

const eachStudent = async (req, res, next) => {
    const id = req.params.id
    try{
        const studentData = await student.findOne({
            registerId: id
        })
        res.json({
            status: true,
            student: studentData
        })


    }catch(err){
        next(err)
    }
    
}

const availableMonth = async (req, res , next) => {
    const id = req.registerId
    try{
        const teacherData = await teacher.aggregate([
            {
                $match: {
                    registerId: id
                }
            },
            {
                $project: {
                    myBatch: 1
                }
            }
        ])
    

        const availableMonth = await batch.aggregate([
            {
                $match: {
                    registerId: teacherData[0]?.myBatch
                },
            },
            {
                $project: {
                    _id: 0,
                    workingDays: 1
                }
            }
        ])
        const sortedAvailbleMonth = await availableMonth[0]?.workingDays?.sort((a,b) => b.month - a.month)
        res.json({
            status: true,
            availableMonth: sortedAvailbleMonth
        })


    }catch(err){
        next(err)
    }
}

const getMyBatch = async(req, res, next) => {
    const id = req.registerId
    try{
        const teacherData = await teacher.aggregate([
            {
                $match: {
                    registerId: id
                },
            },
            {
                    $project: {
                        myBatch: 1
                    }
            }
            
        ])
        if (teacherData[0].myBatch !== "") {
            const batchData = await batch.aggregate([
                {
                    $match: {
                        registerId: teacherData[0].myBatch
                    }
                },
                {
                    $lookup: {
                        from: "teachers",
                        localField: "headOfTheBatch",
                        foreignField: "registerId",
                        as: "teacher_data"
                    }
                }
            ])
            const numberOfSeat = batchData[0].numberOfSeat
            const batchFill = batchData[0].batchFill
            const availableSeat = numberOfSeat - batchFill
            res.json({
                status: true,
                batch: batchData,
                availableSeat
            })
        } else {
            res.json({
                noBatch: true
            })
        }
    }catch(err){
        next(err)
    }
}

const batchStartEndDate = async(req, res, next) => {
    const id = req.registerId
    try{
        const teacherData = await teacher.aggregate([
            {
                $match: {
                    registerId: id
                }
            },
            {
                $project: {
                    myBatch: 1
                }
            }
        ])
        const batchData = await batch.aggregate([
            {
                $match: {
                    registerId: teacherData[0].myBatch
                }
            },
            {
                $project: {
                    startDate: 1,
                    endDate: 1
                }
            }
        ])
        if (batchData.length !== 0) {
            const startDate = new Date(batchData[0].startDate);
            const formattedStartDate = startDate.toISOString().slice(0, 7);
            const endDate = new Date(batchData[0].endDate);
            const formattedEndDate = endDate.toISOString().slice(0, 7);
            const dates = {
                startDate: formattedStartDate,
                endDate: formattedEndDate
            }
            res.json({
                status: true,
                dates: dates
            })
        } else {
            res.json({ noBatch: true })
        }


    }catch(err){
        next(err)
    }
}

const montlyWorkDays = async(req, res, next) =>{
    const id = req.registerId
    try {
        const teacherData = await teacher.aggregate([
            {
                $match: {
                    registerId: id
                }
            },
            {
                $project: {
                    myBatch: 1
                }
            }
        ])
        if (teacherData[0].myBatch !== "") {
            const workingDays = await batch.aggregate([
                {
                    $match: {
                        registerId: teacherData[0].myBatch
                    }
                },
                {
                    $project: {
                        workingDays: 1
                    }
                }
            ])
            const workDays = await workingDays[0]?.workingDays?.sort((a, b) => a.month - b.month)
            res.json({
                status: true,
                workingDays: workDays
            })
        } else {
            res.json({ noBatch: true })
        }

    } catch (err) {
        next(err)
    }
}

const addWorkingDays = async (req, res, next) => {
    const id = req.registerId
    const data = req.body
    try{
        const teacherData = await teacher.aggregate([
            {
                $match: {
                    registerId: id
                }
            },
            {
                $project: {
                    myBatch: 1
                }
            }
        ])
        const workDaysArray = await batch.aggregate([
            {
                $match: {
                    registerId: teacherData[0].myBatch
                }
            },
            {
                $unwind: "$workingDays"
            },
            {
                $project: {
                    workingDays: 1
                }
            }
        ])
        const date = new Date(data.month);
        const isoString = date.toISOString();
        const month = new Date(isoString);
        const found = await helpers.searchArrayElement(workDaysArray, month)
        if (found) {
            res.json({ alert: "The selected month already added" })
        } else {
            await batch.updateOne(
                {
                    registerId: teacherData[0].myBatch
                },
                {
                    $push: {
                        workingDays: data
                    }
                }

            )
            const workingDays = await batch.aggregate([
                {
                    $match: {
                        registerId: teacherData[0].myBatch
                    }
                },
                {
                    $project: {
                        workingDays: 1
                    }
                }
            ])
            const workDays = await workingDays[0].workingDays.sort((a, b) => a.month - b.month)
            res.json({
                status: true,
                workingDays: workDays
            })
        }

    }catch(err){
        next(err)
    }
}

const getBatchSubjects = async(req, res, next) => {
    const id = req.params.id
    try{
        const subjects = await batch.aggregate([
            {
                $match: {
                    registerId: id
                }
            },
            {
                $project: {
                    "subjects.subject": 1,
                    _id: 0
                }
            }
        ])
        subjectArray = subjects[0].subjects
       res.json({
        status: true,
        subjects: subjectArray
       })
    }catch(err){
        next(err)
    }
}

const addAttendance = async (req, res, next) => {
    const data = req.body
   const object = {
    month: data.month,
    workingDays: data.workingDays,
    noOfDaysPresent: data.noOfDaysPresent,
    percent: Math.round(((data.noOfDaysPresent / data.workingDays) * 100) * 100) / 100
   }
  try{
    const attendanceArray = await student.aggregate([
        {
            $match: {
                registerId: data.studentId
            }
        },
        {
            $unwind: "$attendance"
        },
        {
            $project: {
                attendance: 1
            }
        }
    ])
    const date = new Date(data.month)
    const isoString = date.toISOString()
    const month = new Date(isoString)
    const found = await helpers.searchAttendanceMonth(attendanceArray, month)

    if (found){
        res.json({ alert: "Selected month data already added"})
    }else{
        await student.updateOne(
            {
                registerId: data.studentId
            },
            {
                $push: {
                    attendance: object
                }
            }
        )
        const attendanceData = await student.aggregate([
            {
                $match: {
                    registerId: data.studentId
                }
            },
            {
                $project: {
                    attendance: 1
                }
            }
        ])
        const attendanceArray = await attendanceData[0]?.attendance?.sort((a,b) => b.month - a.month)
        const avgStudentAttendance = await student.aggregate([
            {
                $match: {
                    registerId: data.studentId
                }
            },
            {
                $unwind: '$attendance'
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$attendance.percent"},
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    avgAttendance: { $divide: ["$total","$count"]}
                }
            }
        ])
        await student.updateOne(
            {
                registerId: data.studentId
            },
            {
                $set: {
                    avgAttendance: (avgStudentAttendance[0].avgAttendance).toFixed(2)
                }
            }
        )
        res.json({
            status: true,
            attendanceData: attendanceArray
        })
    }


  }catch(err){
    next(err)
  }

}

const addStudentMark = async(req, res, next) => {
    const data = req.body
    const percentage = data.subjectMarks.reduce((acc, obj) => acc+obj.mark,0)/ data.subjectMarks.length
    const roundPercentage = percentage.toFixed(3)
    const markDetails = {
        month: data.month,
        percentage: roundPercentage,
        subjectMarks: data.subjectMarks
    }
    const marksArray = await student.aggregate([
        {
            $match: {
                registerId: data.studentId
            }
        },
        {
            $project: {
                markDetails: 1
            }
        },
        {
            $unwind: "$markDetails"
        },
        {
            $project: {
                _id: 0,
                month: "$markDetails.month"
            }
        }
    ])
    const date = new Date(data.month)
    const isoString = date.toISOString()
    const month = new Date(isoString)
    const found = await helpers.monthSearchMark(marksArray, month)
    if(found) {
        res.json({ alert: "Selected month's marks already added"})
    } else {
        try{
            await student.updateOne(
                {
                    registerId: data.studentId
                },
                {
                    $push: {
                        markDetails: markDetails
                    }
                }
            )
            const studentPerformance = await student.aggregate([
                {
                    $match: {
                        registerId: data.studentId
                    }
                },
                {
                    $unwind: "$markDetails"
                },
                {
                    $group: {
                        _id: null,
                        totalMarks: { $sum: "$markDetails.percentage"},
                        count: { $sum: 1}
                    }
                },
                {
                    $project: {
                        _id:0,
                        avgMark: { $divide: ["$totalMarks", "$count"]}
                    }
                }
            ])
            await student.updateOne(
                {
                    registerId: data.studentId
                },
                {
                    $set: {
                        performance: (studentPerformance[0].avgMark).toFixed(2)
                    }
                }
            )
            res.json( {status: true})
        }catch(err) {
            next(err)
        }
    }
}

const getMarkDetails = async(req, res, next) => {
    const studentId = req.params.id
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
                    markDetails:1
                }
            }
        ])
        const sortedMarkDetails = markDetails[0].markDetails.sort((a,b) => b.month - a.month)
        res.status(200).json({
            markDetails: sortedMarkDetails
        })

    }catch(err) {
        next(err)
    }
}

const getAttendanceDetails = async (req, res, next) => {
    const studentId = req.params.id
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
        const attendanceArray = await attendanceDetails[0]?.attendance?.sort((a, b) => b.month - a.month)
        res.json({
            status: true,
            attendanceData: attendanceArray
        })
    }catch(err){
        next(err)
    }
}

const teacherLetter = async(req, res, next) => {
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
        await teacher.updateOne(
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
        const leaveHistory = await  teacher.aggregate([
            {
                $match: {
                    registerId: id
                }
            },
            {
                $unwind: "$myLeaves"
            },
            {
                $project: {
                    myLeaves: 1
                }
            },
            {
                $sort: {
                    'myLeaves.appliedDate': -1
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

const studentLeaves = async(req, res, next) => {
    try{
        const leaveData = await student.aggregate([
            {
                $match: {
                    myLeaves: { $exists: true}
                }
            },
            {
                $unwind: "$myLeaves"
            },
            {
                $project: {
                    _id: 0,
                    myLeaves: 1,
                    registerId: 1,
                    name: 1
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
            leaveData: leaveData
        })
    }catch(err){
        next(err)
    }
}

const studentLeaveApprove = async(req, res, next) => {
    try{
        const data = req.body
        await student.updateOne(
            {
                registerId: data.id,
                "myLeaves._id": data.arrayElementId    
            },
            {
                $set: {
                    "myLeaves.$.status": 'Approved'
                }
            }
        )
        res.json({ status: true})

    }catch(err){
        next(err)
    }
}


const studentLeaveReject = async (req, res, next) => {
    try{
        const data = req.body
        await student.updateOne(
            {
                registerId: data.id,
                "myLeaves._id": data.arrayElementId    
            },
            {
                $set: {
                    "myLeaves.$.status": 'Rejected',
                    "myLeaves.$.reason": data.reason

                }
            },
        )
        res.json({ status: true})
    }catch(err) {
        next(err)
    }
}

const getBatchPerformance = async(req, res, next) => {
    console.log('hi')
   

    // last eydaam
} 

module.exports = {
    login,
    forgot,
    getHome,
    getMyStudents,
    eachStudent,
    availableMonth,
    getMyBatch,
    getBatchPerformance,
    batchStartEndDate,
    montlyWorkDays,
    addWorkingDays,
    getBatchSubjects,
    addAttendance,
    addStudentMark,
    getMarkDetails,
    getAttendanceDetails,
    teacherLetter,
    getLeaveHistory,
    studentLeaves,
    studentLeaveApprove,
    studentLeaveReject
}