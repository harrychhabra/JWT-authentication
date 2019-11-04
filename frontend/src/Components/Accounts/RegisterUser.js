import React, { Component } from 'react'
import Axios from 'axios';
import {Row} from 'reactstrap';


const base_url = window.SERVER_ADDRESS

class RegisterUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username : '',
            password : '',
            display_username : false,
            display_password : false,
        }

    }
    
    clearForm = () => {
        this.setState({
                username : '',
                password : '',
                display_username : false,
                display_password : false,
        })
    }

    sendRegistration = e => {
        e.preventDefault()
        const {username, password} = this.state
        console.log(this.state)
            Axios.post(base_url + 'social/users/create', {
                'user' : {
                    'username' :  username,
                    'password' : password
                }})
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
            })
            .catch(error => {
                console.log(error)
            })
            this.clearForm()
                
    }
    
    changeHandler = (event) => {
        event.preventDefault()
            var stateObject = function() {
              var returnObj = {};
              returnObj['display_' + event.target.name] = true;
                 return returnObj;
            }();
        
            this.setState( stateObject );    
            this.setState({
                [event.target.name] : event.target.value,
            })
        }
        
    render() {
        return (
            <div>
                <form onSubmit={this.sendRegistration} noValidate>
                    
                    <div>
                        <label htmlFor="username"> Username </label>
                        <input type="text" id="username" name="username" value={this.state.username} onChange={this.changeHandler}  />
                    </div>
                    <div>
                        <label htmlFor="pass"> Password </label>
                        <input type="password" id="pass" name="password" value={this.state.password} onChange={this.changeHandler}  />
                    </div>
                    
                    <button type='submit'>Register</button>
                </form>    
            </div>
        )
    }
}

export default RegisterUser
