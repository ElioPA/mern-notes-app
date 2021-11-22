import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }

    onChangeUsename = e => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        });
        this.setState({username: ''});
        this.getUsers();
        toast.success('Se creó un nuevo usuario');
    }

    deleteUser = async id => {
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        this.getUsers();
        toast.error('Se eliminó un usuario', { icon: '😟' });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="mb-3">
                                <input type="text"
                                    className="form-control"
                                    onChange={this.onChangeUsename}
                                    value={this.state.username}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" 
                                    key={user._id}
                                    onDoubleClick={() => this.deleteUser(user._id)}
                                    >
                                    {user.username}
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
