import React, { Component } from 'react';
import './App.css';
// Importing Navbar Components of react JS
import NavComponent from './Components/NavComponent';


// From public/config.js
const base_url = window.SERVER_ADDRESS


class App extends Component {

	// props: Global variable or object
	constructor(props) {
		super(props)

		// Using three instances
		this.state = {
			 logged_in : localStorage.getItem('token') ? true : false,
			 username : '',
			 displayed_form : ''
		}
	}

	// Runs automatically; Lifecycle of ReactJS
	/*
		Here, User authentication is determined from local storage content
	*/
	componentDidMount(){
		if(this.state.logged_in){
			fetch(base_url + 'social/current_user/', {
				method : 'GET',
				headers : {
					Authorization : `JWT ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(resp => {
				this.setState({ username : resp.username })
			})
			.catch(err => console.log(err));
		}
	}


	/*
		Setter function for setting the value of instance
		Instance, here is, the form to be displayed on the page
	*/
	display_form = (formName) => {
        this.setState({
            displayed_form : formName
        });
    }


    /*
		Setter Function
		Set's the input by the user to the instance
    */
	handleLoginChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
	}
	

	// Deals with removing token from local storage
	handleLogout = () => {
		localStorage.removeItem('token');
		this.setState({logged_in : false, username : ''})
	}


	/*
		Function makes an ajax to server for authenication
		In succesfull response, retrieves the token and stores it in local storage
	*/
	handleLogin = (e, data) => {

		e.preventDefault();

		fetch(base_url + 'token-auth/', {
			crossDomain : true,
			withCredentials : true,
			async : true,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => {

			localStorage.setItem('token', json.token);
			this.setState({
				logged_in : true,
				username : json.user.username
			})
		})
		.catch(error => {
			console.log(error)
		})
		// Hiding login form
		this.setState({
			displayed_form : ''
		})
	}
	render() {
		const { logged_in, username, displayed_form } = this.state;
		return (
			<div>
				<NavComponent
				logged_in = {logged_in}
				handleLogin = {this.handleLogin}
				handleLoginChange = {this.handleLoginChange}
				handleLogout = {this.handleLogout}
				username = {username}
				displayed_form = {displayed_form}
				display_form = {this.display_form}
				 />
				<h3>{
					this.state.logged_in
					? `Hello ${this.state.username}`
					: 'You are not logged in'
				}</h3>
			</div>
		)
	}
}

export default App;