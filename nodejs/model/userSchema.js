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


const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        min: 256
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    created: {
        from: {
            type: String,
            required: true,
            min: 32
        },
        at: {
            type: Date,
            default: Date.now
        }
    },
    updated: [{
        from: {
            type: String,
            required: true,
            min: 32
        },
        at: {
            type: Date,
            default: Date.now
        }
    }]
});

user = mongoose.model('users', userSchema);
refreshToken = mongoose.model('refreshtokens', refreshTokenSchema);

module.exports = { User: user, RefreshToken: refreshToken }