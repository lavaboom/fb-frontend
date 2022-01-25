// React modules
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './LoginPage.scss'
// other sub components
import Input from '../../components/Input/Input';
// 3rd party libraries
import axios from 'axios';

export default class LoginPage extends Component {
    state = {
        error: '',
        success: false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:8080/api/users/login', {
                email: event.target.email.value,
                password: event.target.password.value
            })
            .then((response) => {
                sessionStorage.setItem('token', response.data.token);
                this.setState({ success: true });
            })
            .catch((error) => {
                this.setState({ error: error.response.data });
            });
    };

    render() {
        return (
            <main className='login-page'>
                <form className='login' onSubmit={ this.handleSubmit }>
                    <h1 className='login__title'>Log in</h1>

                    <Input type='text' name='email' label='Email' />
                    <Input type='password' name='password' label='Password' />
                
                    <button className='login__button'>Log in</button>

                    {this.state.error && <div className='login__message'>{this.state.error}</div>}
                    {this.state.success && <Redirect to='/' />}
                </form>
                <p>
                    Need an account? <Link to='/signup'>Sign up</Link>
                </p>
            </main>
        );
    }
}
