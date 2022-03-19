const { Schema, model } = require('mongoose')
const analyticsSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    views: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = model('analytics', analyticsSchema);