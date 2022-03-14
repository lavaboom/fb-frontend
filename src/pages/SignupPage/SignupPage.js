// React modules
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './SignupPage.scss'
// other sub components
import Input from '../../components/Input/Input';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/authReducer';

const SignupPage = () => {

    /* -------------------------------------------------------------------------
    setup redux and local variable
    ------------------------------------------------------------------------- */
    const dispatch = useDispatch();
    let error = useSelector(state => state.auth.error);
    const [signedUp, setSignedUp] = useState(false);

    /* -------------------------------------------------------------------------
    event handlers
    ------------------------------------------------------------------------- */
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
            name: event.target.name.value,
            user_type: 'Driver',
        }
        dispatch(signup(data));
        event.target.reset();
        setSignedUp(true);
    };

    /* -------------------------------------------------------------------------
    rendering
    ------------------------------------------------------------------------- */
    return (
        <main className='signup-page'>
            <form className='signup' onSubmit={ handleSubmit }>
                <h1 className='signup__title'>Sign up</h1>

                <Input type='text' name='name' label='Name' />
                <Input type='text' name='email' label='Email' />
                <Input type='password' name='password' label='Password' />
                {/* <div className=''>
                    <p>Profile type</p>
                    <input type='radio' name='user_type' id='option-1' value={ 'Kitchen' } 
                            />
                    <label htmlFor='option-1' className=''>Kitchen</label>
                    <input type='radio' name='user_type' id='option-2' value={ 'Driver' } defaultChecked />
                    <label htmlFor='option-2' className=''>Driver</label>
                </div> */}
                <button className='signup__button'>Sign up</button>

                { signedUp && <Redirect to='/kitchen' /> }
                { error && <div className='signup__message'>{ error }</div> }
            </form>
            <p>
                Have an account? <Link to='/login'>Log in</Link>
            </p>
        </main>
    );
}
 
export default SignupPage;
