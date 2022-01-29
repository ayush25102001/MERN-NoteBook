import React, { useContext, useState } from "react"
import noteContext from "../context/noteContext"


const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description)
        setNote({ title: "", description: "", tag: "" })
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
        <div>
            <h1>Add a Note</h1>
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

    )
}

export default AddNote