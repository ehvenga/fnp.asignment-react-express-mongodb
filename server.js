const express = require('express')
const app = express()
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { Base64 } = require('js-base64')
const expressUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

const port = process.env.PORT || 5000
const { ACCESS_SECRET } = process.env

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(expressUpload())

const { connectDB, connectCloudinary } = require('./config/index')
connectDB()
connectCloudinary()

const UserModel = require('./models/User')
const FileModel = require('./models/File')
const DataModel = require('./models/Data')

// generate tokens utilities
function generateAccessJwt(payload) {
    return jwt.sign(payload, ACCESS_SECRET)
}

app.post('/signin', async (req, res) => {
    const {email, password} = req.body

    const user = {
        user: email
    }

    try {
        const returnUser = await UserModel.findOne({'email':`${email}`})
        if (returnUser != null){
            // check password by decrypting hash
            const isMatching = await bcrypt.compare(password, returnUser.passcode)
            if (isMatching) {
                // create access token
                const accessToken = generateAccessJwt(user)
                res.status(200).json({"token": accessToken})
            }
            else {
                console.log('Credentials Not Matching')
                return res.status(401).json({message: "Incorrect password"})
            }
        }
        else{
            console.log('Email Not Found')
            res.status(403).json({message: "Email not found"})
        }
    } catch (error) {
        return res.status(500).json({message: "internal error: try again"})
    }
})

app.post('/signup', async (req, res) => {
    const {name, email, password} = req.body

    try {
        // hash password for storage
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        passcode = hashedPassword
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal error: user not created"})
    }

    userData = {
        name,
        email,
        passcode
    }

    const user = {
        user: email
    }

    try {
        const newUserDoc = new UserModel(userData)
        await newUserDoc.save()
        // create access token
        const accessToken = generateAccessJwt(user)
        res.status(201).json({"token": accessToken})
    } catch (error) {
        const emailExists = await UserModel.findOne({ email: req.body.email })
        if (emailExists) {
            return res.status(401).json({message: "Email already exists"})
        }
        console.log(error)
        return res.status(500).json({message: "internal error: user not created"})
        
    }
})

app.get('/profile', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verifiedToken = jwt.verify(token, ACCESS_SECRET)
    console.log("Verified Token", verifiedToken)
    try {
        const fetchUser = await UserModel.findOne({ email: verifiedToken.user })
        res.status(200).json({name: fetchUser.name, email: fetchUser.email, src: fetchUser.photo})
    } catch (error) {
        res.send(500).json({message: "Internal Error"})
    }
})

app.post('/image', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verifiedToken = jwt.verify(token, ACCESS_SECRET)
    console.log(req.files)
    try {
        if (req.files) {
            const fetchUser = await UserModel.findOne({ email: verifiedToken.user })
            const base64String = Base64.encode(req.files.image.data)
            const uploadResult = await cloudinary.uploader.upload(`data:${req.files.image.mimetype};base64,${base64String}`,{
                folder: "fnp/"
            })
            .catch(err => {
                console.log(err)
            })
            await UserModel.updateOne({email: fetchUser.user},
                {   
                    photo: uploadResult.url
                })
        }
        res.status(200).json({name: fetchUser.name, email: fetchUser.email, src: fetchUser.photo})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Error"})
    }
})

app.post('/upload', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verifiedToken = jwt.verify(token, ACCESS_SECRET)


    filetype = req.files.uploadFile.mimetype.split('/')
    
    if (filetype[1] != "json") {
        return res.status(401).json({message: "Error Uploading: Only JSON Files Allowed"})
    }

    try {
        if (req.files) {
            const obj = JSON.parse(req.files.uploadFile.data.toString('ascii'))
            const newFile = {
                name: req.files.uploadFile.name,
                data: []
            }
            const newFileDoc = new FileModel(newFile)
            const savedFileDoc = await newFileDoc.save()

            await UserModel.findOneAndUpdate({ email: verifiedToken.user },
                {
                    $push: {
                        "files": savedFileDoc._id
                    }
                })

            obj.forEach(async (element) => {
                const newDataDoc = new DataModel(element)
                const savedDataDoc = await newDataDoc.save()
                await FileModel.findByIdAndUpdate( savedFileDoc._id, 
                    {
                        $push: {
                            "data": savedDataDoc._id
                        }
                    })
            })
        }
    } catch (error) {
        throw error
    }
})

app.get('/files', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verifiedToken = jwt.verify(token, ACCESS_SECRET)
    console.log("Verified Token", verifiedToken)
    try {
        const fetchUser = await UserModel.findOne({ email: verifiedToken.user })
        .populate({
            path: "files",
            populate: [{
                path: "data"
            }]
        })
        return res.status(200).json({
            name: fetchUser.name, 
            email: fetchUser.email, 
            src: fetchUser.photo, 
            files: fetchUser.files
        })
    } catch (error) {
        res.send(500).json({message: "Internal Error"})
    }
})

app.listen(port, () => {
    console.log(`Server Started at Port ${port}`)
})