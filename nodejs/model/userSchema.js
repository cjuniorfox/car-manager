const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    tel: {
        type: String,
        required: true,
        min: 10,
        max: 11
    },
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} já registrado anteriormente' });

user = mongoose.model('user', userSchema);

module.exports = { User: user }