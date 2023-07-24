const { Schema, model } = require('mongoose')
const serverSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        required: true,
    },
    timezone: {
        type: String,
        required: true,
        default: 'UTC'
    },
    avatar: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true,
        default: []
    },
    forms: {
        type: Array,
        required: true,
        default: []
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    tokens: {
        type: Array,
        required: true,
        default: []
    },
    lastLogin: {
        type: String,
        required: true,
        default: Date.now().toString()
    },
})

module.exports = model('user', serverSchema);