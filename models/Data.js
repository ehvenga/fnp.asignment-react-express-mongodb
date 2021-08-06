const mongoose = require('mongoose')

const DataScehma = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
})

const DataModel = mongoose.model('Data', DataScehma)
module.exports = DataModel