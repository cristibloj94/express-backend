const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cDate: {
        type: Date,
        default: Date.now
    },
    eDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "ACTIVE"
    },
})

module.exports = mongoose.model('Users', UserSchema)