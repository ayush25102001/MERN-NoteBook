//import { PromiseProvider } from "mongoose"
import React from "react"
import NoteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
    const initialnotes = []
    const [notes, setNotes] = useState(initialnotes)

    const getNotes = async () => {
        const response = await fetch('http://localhost:5000/api/readNotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json=await response.json();
        //console.log(json)
        setNotes(json)
    }

    const addNote = async (title, description) => {
        const response = await fetch('http://localhost:5000/api/createNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        });
        //*****WE ADDED TO DATBASE BY TRIGGERING OUR BACKEND API*******
        const json = await response.json();
        const note = {
            "_id": json._id,      //now every note in the notes array will also have a unique id
            "user": json.user,
            "title": title,
            "description": description,
        }
        setNotes(notes.concat(note))
        //******ADDED TO OUR NOTES ARRAY THAT WILL BE RENDERED INTHE FRONTEND******
    }

    const editTheNote = async (id, title, description) => {

        const response = await fetch('http://localhost:5000/api/updateNote/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        }); 
        //updated in the dataBase
        const json = response.json();
        let tempnotes=notes;
        tempnotes.forEach((item) => {
            if (item._id === id) {
                item.title = title;
                item.description = description;
            }
        })
        setNotes(tempnotes)
    }

    const deleteNote = async (id) => {  //id : same for every note as hardcoded currently and notes array evaluates on that basis
        //const idd = '61eaecfc35da36c05804b6f8'  //id as provided by mongoDB
        const response = await fetch('http://localhost:5000/api/deleteNote/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            // body: JSON.stringify({ title, description })
        });
        //const json = response.json();
        const newnotes = notes.filter((item) => {
            return item._id !== id
        })
        setNotes(newnotes)
    }




    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editTheNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
//The state defined here in NoteState can be inherited by all its child components.
export default NoteState