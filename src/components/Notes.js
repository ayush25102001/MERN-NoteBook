import React, { useContext, useEffect, useRef, useState } from "react"
import noteContext from "../context/noteContext"
import NoteItem from "./NoteItem"
import AddNote from "./AddNote"
import { useNavigate } from 'react-router-dom'
const Notes =  () => {
    const context = useContext(noteContext)
    let history=useNavigate()
    const { notes, getNotes, editTheNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')!=null){
            getNotes()
        }
       else{
           console.log('ISSUE')
           history('/login')
       }
    }, [getNotes,history])
    const [note, setNote] = useState({id:"", title: "", description: "", tag: "" })
    const ref = useRef(null)
    const refclose=useRef(null)
    const editNote = async (note) => {
        ref.current.click()
        setNote({id:note._id, title:note.title,description:note.description})
    }
    const handleclick = (e) => {
        e.preventDefault()
        editTheNote(note._id,note.title,note.description)
        refclose.current.click()
        //addNote(note.title, note.description)
    }
    const onChange = (e) => {
        setNote(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit-Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                                    {/* name  field is used to access state */}
                                </div>
                                <div className="mb-3">
                                    <label for="desc" className="form-label">Description</label> 
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                                </div>
                                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                                <button type="submit" className="btn btn-primary" onClick={handleclick}>ADD NOTE</button>
                                {/* <button type="submit" className="btn btn-primary" onClick={
                    async (e) => {
                        //e.preventDefault()
                        var a = document.getElementById('title')
                        var b = document.getElementById('description')
                        a.innerHTML = ""
                        b.innerHTML = ""
                        
                    }
                }>CLEAR</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onclick={handleclick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return (<NoteItem note={note} editNote={editNote} />)
                })}
            </div>
        </>
    )
}

export default Notes