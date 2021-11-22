import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default class NotesList extends Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.getNotes();
    }

    async getNotes(){
        const res = await axios.get('http://localhost:4000/api/notes');
        this.setState({notes: res.data});
    }

    async deleteNote(id){
        await axios.delete(`http://localhost:4000/api/notes/${id}`);
        
        this.getNotes();
        toast.success('Se eliminó una nota', { icon: '😟' });
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5 className="p-1">{note.title}</h5>
                                    <Link className="btn btn-warning" to={`/edit/${note._id}`}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p><br />
                                    <b>Author: {note.author}</b><br />
                                    <small><i>{format(note.date)}</i></small> 
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
