const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: ''
    }

})

module.exports = mongoose.model('User', User)