const bcrypt = require("bcrypt");
const teacher = require("../models/teacher")
const jwt = require("jsonwebtoken");

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

const getHome = async (req, res, next) => {
    const id = req.registerId
    try{
        const teacherData = await teacher.find({registerId: id})
        res.json({ teacherData })
    }catch(err) {
      next(err)
    }

}

module.exports = {
    login,
    getHome
}