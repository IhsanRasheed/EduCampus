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

module.exports = {
  login,
  getHome
};
