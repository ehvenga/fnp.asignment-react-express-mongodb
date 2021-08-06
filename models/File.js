const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    data: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Data'
        }
    ]
})

const FileModel = mongoose.model('File', FileSchema)
module.exports = FileModel