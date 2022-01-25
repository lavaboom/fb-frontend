// React modules
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './SignupPage.scss'
// other sub components
import Input from '../../components/Input/Input';
// 3rd party libraries
import axios from 'axios';

export default class SignupPage extends Component {
    state = {
        error: '',
        success: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:8080/api/users/register', {
                email: event.target.email.value,
                password: event.target.password.value,
                name: event.target.name.value,
            })
            .then(() => {
                this.setState({ success: true, error: '' });
                event.target.reset();
            })
            .catch((error) => {
                this.setState({ success: false, error: error.response.data });
            });
    };

    render() {
        return (
            <main className='signup-page'>
                <form className='signup' onSubmit={this.handleSubmit}>
                    <h1 className='signup__title'>Sign up</h1>

                    <Input type='text' name='name' label='Name' />
                    <Input type='text' name='email' label='Email' />
                    <Input type='password' name='password' label='Password' />

                    <button className='signup__button'>Sign up</button>

                    {this.state.success && <div className='signup__message'>Signed up!</div>}
                    {this.state.error && <div className='signup__message'>{ this.state.error }</div>}
                </form>
                <p>
                    Have an account? <Link to='/login'>Log in</Link>
                </p>
            </main>
        );
    }
}
