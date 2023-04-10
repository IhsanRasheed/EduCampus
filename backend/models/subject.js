const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
        uppercase: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('subject',subjectSchema)


