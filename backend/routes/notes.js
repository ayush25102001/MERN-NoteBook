const express=require('express')
const router=express.Router()
const verifyToken=require('../middleware/auth')
const Notes=require('../models/Notes')

//fetching a note
router.get('/api/readNotes',verifyToken,async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.user._id}) //Finding notes of the user we just authenticated 
        res.send(notes)
    }catch(e){
        res.status(400).send("something went wrong")
    }
})

//creating a note
router.post('/api/createNote',verifyToken,async (req,res)=>{
    try{
        const note=new Notes({
        user:req.user._id,
        ...req.body})
        note.save()
        res.send(note)
    }catch(e){
        res.status(400).send("something went wrong")
    }
})

//updating a note
router.patch("/api/updateNote/:id",verifyToken,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedupdates=['title','tag','description']  
    const isvalidoperation=updates.every((update)=>{return allowedupdates.includes(update)})
    if(!isvalidoperation)
    {
        return res.status(404).send()
    }
    try{
        const _id=req.params.id
        const note=await Notes.findById(_id)
        updates.forEach((update)=>{
        note[update]=req.body[update]   
        })
        await note.save()
        if(!note){
           return res.status(404).send()
        }
        res.send(note)
    }catch(e){
        res.status(400).send(e)
    }
})

//deleting a note
router.delete("/api/deleteNote/:id",verifyToken,async (req,res)=>{
    const note=await Notes.findOneAndDelete({_id:req.params.id})//,user:req.user._id})
    try{
        if(!note){
            return res.status(400).send()
        }
        res.send(note)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports=router
