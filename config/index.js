const mongoose = require('mongoose')
require('dotenv').config()
const { DATABASE_URL } = process.env

exports.connectDB = async () => {
    mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err) => {
        if (err) throw err
        console.log('MongoDB Connected')
    })
}