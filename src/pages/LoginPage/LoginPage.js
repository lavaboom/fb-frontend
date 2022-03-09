// React modules
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './LoginPage.scss'
// other sub components
import Input from '../../components/Input/Input';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/authReducer';

const LoginPage = () => {

    // returns the dispatch function of the redux store
    const dispatch = useDispatch();

    // subscribe to slices of the store we're interested in
    let isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    let error = useSelector(state => state.auth.error);

    // event handlers
    let handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        dispatch(login(data));
    }

    return (
        <main className='login-page'>
            <form className='login' onSubmit={ handleSubmit }>
                <h1 className='login__title'>Log in</h1>

                <Input type='text' name='email' label='Email' />
                <Input type='password' name='password' label='Password' />
            
                <button className='login__button'>Log in</button>

                {error && <div className='login__message'>{error}</div>}
                {isLoggedIn && <Redirect to='/kitchen' />}

                {/* {this.state.userType === 'Kitchen' ? <Redirect to='/kitchen' /> : <Redirect to='/driver' />} */}
            </form>
            <p>
                Need an account? <Link to='/signup'>Sign up</Link>
            </p>
        </main>
    );
}
 
export default LoginPage;
