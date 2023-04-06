const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const dbconnect = require('./config/databaseConnection')
const officeRouter = require('./routes/office')
const studentRouter = require('./routes/student')
const teacherRouter = require('./routes/teacher')
const errorHandler = require('./middleware/ErrorHandler')
const handleMongoError = require('./middleware/mongoHandler')

dotenv.config()
dbconnect.dbconnect();


app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/office', officeRouter) 
app.use('/student', studentRouter)
app.use('/teacher', teacherRouter)

app.use(errorHandler)
app.use(handleMongoError)

app.listen(process.env.PORT, () => {
    console.log(`PORT is running at ${process.env.PORT}`);
});
 