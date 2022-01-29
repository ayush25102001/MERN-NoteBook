const mongoose=require('mongoose')
const validator = require('validator')
//const jwt=require('jsonwebtoken')
//const bcrypt = require('bcryptjs')

const notesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    description:{
        type: String,
        required: true,
        trim: true
    }
    },{
     timestamps:true    
 })

const Notes=mongoose.model('Notes', notesSchema)
module.exports=Notes