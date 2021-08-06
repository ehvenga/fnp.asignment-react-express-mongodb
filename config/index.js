const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const { DATABASE_URL, CLOUD_NAME, API_KEY, API_SECRET } = process.env

exports.connectDB = () => {
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

exports.connectCloudinary = () => {
    cloudinary.config({ 
        cloud_name: CLOUD_NAME, 
        api_key: API_KEY, 
        api_secret: API_SECRET 
    })
}