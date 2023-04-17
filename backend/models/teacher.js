const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    registerId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        required: true,
        type: String
    },
    salary: {
        required: true,
        type: Number
    },
    address: {
        house_name: {
            type: String,
            required: true,
            trim: true
        },
        place: {
            type: String,
            required: true,
            trim: true
        },
        post: {
            type: String,
            required: true,
        },
        pin: {
            type: Number,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        }
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        default: 0
    },
    myBatch: {
        default: "",
        type: String
    },
    password: {
        type: String, 
        required: true,
        trim: true
    },
    image: [{
        url: {
            type: String
        },
        filename: {
            type: String
        }
    }],
    myLeaves: {
        type: [
          {
            appliedDate:{
              type: Date
            },
            from: {
              type: Date
            },
            to:{
              type:Date
            },
            letter: {
              type: String
            },
            status: {
              type: String,
              default: "Pending"
            },
            reason:{
             type:String,
             default:""
            }
          }
        ],
        default: [],
    }
})

module.exports = mongoose.model('teacher', teacherSchema)