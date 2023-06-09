const jwt = require("jsonwebtoken");

const tokenTeacher = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error("No token provided");
    error.statusCode = 401;
    return next(error);
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.TEACHER_SECRET);
    if (decoded) {
      req.registerId = decoded.registerId;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const tokenStudent = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    const error = new Error("No token provided");
    error.statusCode = 401;
    return next(error);
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.STUDENT_SECRET);
    if (decoded) {
      req.registerId = decoded.registerId;
      next();
    }
  } catch (error) {
    next(error);
  }

}

const tokenOffice = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
    const error = new Error("No token Provided")
    error.statusCode = 401
    return next(error)
  }
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.OFFICE_SECRET)
      if(decoded) 
       next()
    } catch(error) {
      next(error)
    }
  
}

module.exports = {
  tokenTeacher,
  tokenStudent,
  tokenOffice,
};
