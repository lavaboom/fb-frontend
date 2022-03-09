// React modules
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './LoginPage.scss'
// other sub components
import Input from '../../components/Input/Input';
// redux
import { connect } from 'react-redux';
import { login } from '../../store/authReducer';

class LoginPage extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        this.props.login(data);
    }

    render() {
        return (
            <main className='login-page'>
                <form className='login' onSubmit={ this.handleSubmit }>
                    <h1 className='login__title'>Log in</h1>

                    <Input type='text' name='email' label='Email' />
                    <Input type='password' name='password' label='Password' />
                
                    <button className='login__button'>Log in</button>

                    {this.props.error && <div className='login__message'>{this.props.error}</div>}
                    {this.props.isLoggedIn && <Redirect to='/kitchen' />}

                    {/* {this.state.userType === 'Kitchen' ? <Redirect to='/kitchen' /> : <Redirect to='/driver' />} */}
                </form>
                <p>
                    Need an account? <Link to='/signup'>Sign up</Link>
                </p>
            </main>
        );
    }
}

// subscribe to the auth slice of the store
const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error
})

// dispatch function to modify the store
const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
