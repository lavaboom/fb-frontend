// React modules
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
// app styles & assets
import './Header.scss'
// other sub components
import LogoutButton from '../LogoutButton/LogoutButton';


export default function Header() {

    /* -------------------------------------------------------------------------
    redux setup and local variables
    ------------------------------------------------------------------------- */

    const [mobileMenu, setMobileMenu] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

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
        setIsLoggedOut(true);
    };

    /* -------------------------------------------------------------------------
    rendering
    ------------------------------------------------------------------------- */
    return (
        (isLoggedOut) ? <Redirect to='/' /> :
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
                        <LogoutButton handleLogout = { handleLogout } />
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
