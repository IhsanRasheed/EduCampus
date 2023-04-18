const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
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
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
    trim: true,
  },
  parentPhone: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
    trim: true,
  },
  institute: {
    type: String,
    required: true,
    trim: true,
  },
  university: {
    type: String,
    required: true,
    trim: true,
  },
  batch: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  address: {
    house_name: {
      type: String,
      trim: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
    post: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: [{
    url: {
      type: String
    },
    filename: {
      type: String
    }
  }],
  avgAttendance:{
    type:Number,
   default:0
  },
  pendingFee: {
    type:Number
   },
  attendance: {
    type: [
      {
        month: {
          type: Date
        },
        workingDays: {
          type: Number
        },
        noOfDaysPresent: {
          type: Number
        },
        percent: {
          type: Number
        }
      }
    ],
    default: [],

  },
  markDetails: {
    type: [
      {
        month: {
          type: Date
        },
        percentage: {
          type: Number
        },
        subjectMarks: {
          type: [
            {
              subject: {
                type: String
              },
              mark: {
                type: Number
              },
            }
          ]
        },


      }
    ],
    default: []
  },
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
  
});

module.exports = mongoose.model('student',studentSchema)