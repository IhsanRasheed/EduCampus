
// const jwt = require("jsonwebtoken");

// const auth = async (req, res, next) => {
//   console.log("token checking");
//   console.log(req.headers)
//   const { authorization } = req.headers;
//   if (!authorization) {
//     console.log('jijin')
//     return res.status(401).send({ message: "Authorization required" });
//   }
//   const token = authorization.split(" ")[1];
//   try {
//     const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (error) {
//     return res.status(401).send({ message: "Invalid Authorization" });
//   }
// };

// module.exports = auth;