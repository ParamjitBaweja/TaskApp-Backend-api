const express = require ('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/users')
const auth = require('../middleware/auth')
const Temp = require('../models/temp')
const {sendWelcomeEmail,sendCancellationEmail} = require('../emails/account')

const router = new express.Router()

//C
router.post('/users', async(req,res)=>{
    const user = new User(req.body)
    //const temp = new Temp(req.body) 
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        //await temp.save()
        const token = await user.genAuthToken()
        res.send({user,token})
        //res.send()
    }catch(e){
        // res.status(400)
        // res.send(e)
        res.status(400).send(e)
    }
})
//Logging users in
router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCred(req.body.email,req.body.password)
        const token = await user.genAuthToken()
        res.send({user,token})
    }catch(e)
    {
        res.status(400).send()
    }
})

//logging out users
router.post('/users/logout', auth , async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token!== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})
//log out from all devices
router.post('/users/logoutAll', auth , async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})
//R
// router.get('/users', auth ,(req,res)=>{
//     User.find({}).then((user)=>{
//         res.send(user)
//     //since there is no condition mentioned here, it will send back all the users
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })
//since the only time a user can read from the 
//database of users is when they want to see their own profile,

router.get('/users/me', auth ,(req,res)=>{
        res.send(req.user)
        //since the user found is being stored in req.user
    })


// router.get('/user/:id',(req,res)=>{
//     // mongoose converts string IDs to object IDs by itself
//     const _id= req.params.id

//     User.findById(_id).then((user)=>{
//         if(!user)
//         {
//             res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })
//U
router.patch('/users/me',auth, async (req,res)=>{

    const updates = Object.keys(req.body)
    const Allowedupdates = ['name', 'email','age','password']
    const isValid = updates.every((update)=>Allowedupdates.includes(update))

    if(!isValid)
    {
        res.status(400).send("invalid updates")
    }

    try{
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
//D

// allow user to delete their own profile
router.delete('/users/me', auth,async (req,res)=>{

    try{
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user)
        // {
        //     res.status(404).send()
        // }
        // //if there is no user to update

        await req.user.remove()
        sendCancellationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})


//upload profile picture
const upload = multer({
    limits : {
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!(file.originalname.endsWith('.jpg')||file.originalname.endsWith('.jpeg')||file.originalname.endsWith('.png'))){
        return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res)=>{

    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error,req,res,next) =>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user||!user.avatar)
        {
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch{
        res.status(404).send()
    }
})

module.exports=router