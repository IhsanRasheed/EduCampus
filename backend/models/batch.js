const mongoose = require("mongoose");

const batchSchema = mongoose.Schema({
  registerId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  numberOfSeat: {
    type: Number,
    required: true,
  },
  batchFill: {
    type: Number,
    default: 0
  },
  headOfTheBatch: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  remarks: {
    type: String,
  },
  subjects: [
    {
      subject: {
        type: String,
        required: true,
        trim: true,
      },
      teacher: {
        type: String,
        trim: true,
      },
    },
  ],
});

module.exports = mongoose.model("batch", batchSchema);
