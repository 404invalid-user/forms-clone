const {Schema, model} = require('mongoose')
const serverSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    settings: {
        users: {
            type: Array,
            required: true,
            default: []
        },
        guild: {
            type: String,
            required: false,
        },
        webhook: {
            type: String,
            required: false,
        },
    },
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
        default: []
    },
    views: {
        type: Array,
        required: true,
        default: []
    },
    answers: {
        type: Array,
        required: true,
        default: []
    }
  })

  module.exports = model('Form', serverSchema);