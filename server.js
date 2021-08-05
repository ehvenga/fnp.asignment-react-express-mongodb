const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const { connectDB } = require('./config/index')
connectDB()

app.all('*', (req, res) => {
    res.send("404")
})

app.listen(port, () => {
    console.log(`Server Started at Port ${port}`)
})