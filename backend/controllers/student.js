const bcrypt = require("bcrypt");
const student = require("../models/student");

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
        res.json({
          success: true,
          registerId: data.registerId
        });
      } else {
        res.json({
          error: "invalid Password",
        });
      }
    } else {
      res.json({ error: "Invalid register Id or password" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login,
};
