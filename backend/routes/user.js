const mongoose=require('mongoose')
const express=require('express')
const User=require('../models/User')
const jwt=require('jsonwebtoken')
const router=new express.Router()
const verifyToken=require('../middleware/auth')


router.get('/api/welcome',verifyToken,async (req,res)=>{
    if(!req.user)
    {
        res.send("Something went wrong")
    }
      res.send("Welcome")
})



//create user
router.post('/api/users',async (req,res)=>{
    const user=new User(req.body)
    const token=jwt.sign({_id:user._id},'hello')
    try{
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send('false')
    }
})


//user login
router.post('/api/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token=jwt.sign({_id:user._id},'hello')
        res.send({token }) 
    }catch(e){
        res.status(400).send('false')
    }
})

module.exports=router