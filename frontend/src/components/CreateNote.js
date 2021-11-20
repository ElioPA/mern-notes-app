import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {
    
    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        });

        if(this.props.match.params.id){
            this.getNoteForEdit(this.props.match.params.id);           
        }
    }

    async getNoteForEdit(id){
        const res = await axios.get('http://localhost:4000/api/notes/' + id);
        const {title, content, author, date} = res.data;
        this.setState({
            title: title,
            content: content,
            userSelected: author,
            date: new Date(date),
            editing: true,
            _id: id
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        if(this.state.editing){
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);
        } else{
            await axios.post('http://localhost:4000/api/notes', newNote);
        } 
        this.props.history.push('/');
    }

    onInputChange = e => {    
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeDate = date => {
        this.setState({date})
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <select 
                                className="form-control"
                                name="userSelected"
                                value={this.state.userSelected} 
                                onChange={this.onInputChange}
                                >
                                {this.state.users.map(user => 
                                    <option key={user} value={user}>{user}</option>)}
                            </select>
                        </div>

                        <div className="mb-3">
                            <input type="text" 
                                className="form-control" 
                                name="title"
                                value={this.state.title} 
                                placeholder="Title"
                                onChange={this.onInputChange} 
                                required 
                                 />
                        </div>

                        <div className="mb-3">
                            <textarea name="content" 
                                className="form-control"
                                value={this.state.content} 
                                placeholder="Content" 
                                onChange={this.onInputChange}
                                required
                                >
                            </textarea>
                        </div>

                        <div className="mb-3">
                            <DatePicker 
                                className="form-control" 
                                selected={this.state.date} 
                                onChange={this.onChangeDate} 
                                />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
