import React, { useContext, useEffect } from "react"
import noteContext from "../context/noteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note,editNote } = props
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <i class="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i class="fas fa-user-edit mx-2" onClick={()=>{editNote(note)}}></i>

                </div>
            </div>
        </div>

    )
}

export default NoteItem


//using onClick={deleteNote(note_id)} did not work