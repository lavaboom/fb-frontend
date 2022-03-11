import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import './Header.scss'

export default function Header() {

    /* -------------------------------------------------------------------------
    redux setup and local variables
    ------------------------------------------------------------------------- */
    const dispatch = useDispatch();

    const [mobileMenu, setMobileMenu] = useState(false);

    let user = JSON.parse(sessionStorage.getItem('user'));
    let currentURL = window.location.href;
    let isKitchenView = currentURL.indexOf('kitchen') > -1 ? true : false;

    /* -------------------------------------------------------------------------
    event handlers
    ------------------------------------------------------------------------- */
    const toggleMobileMenu = () => {
        let isMobileMenu = mobileMenu ? false : true;
        setMobileMenu(isMobileMenu);
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        dispatch({ type: 'authRemoved'});
    };

    /* -------------------------------------------------------------------------
    rendering
    ------------------------------------------------------------------------- */
    return (
        <header className='header'>
            <nav className='navbar'>
                <Link to={'./'} className='navbar__logo'>Food Bunnies</Link>
                <ul className={`navbar__menu ${ mobileMenu ? 'navbar__menu--active' : '' }`}> 
                    <li className='navbar__item'>
                        <Link className='navbar__link' to={`${ isKitchenView ? '/driver' : '/kitchen'}`}>Switch to {`${ isKitchenView ? 'Driver' : 'Kitchen'}`} view</Link>
                    </li>
                    <li className='navbar__item'>
                        <p>Welcome, { user.name }</p>
                    </li>
                    <li className='navbar__item'>
                    <button className='navbar__button' onClick={ handleLogout }>
                        Log out
                    </button>
                    </li>
                </ul>
                <div className={`hamburger ${ mobileMenu ? 'hamburger--active' : '' }`} onClick={ toggleMobileMenu }> 
                    <span className='hamburger__bar'></span>
                    <span className='hamburger__bar'></span>
                    <span className='hamburger__bar'></span>
                </div>
            </nav>
        </header>
    )
}
