const { Schema, model } = require('mongoose')
const serverSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    time: {
        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true,
        }
    },
    questions: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = model('Formanswer', serverSchema);