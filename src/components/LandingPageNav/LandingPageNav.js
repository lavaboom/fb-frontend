import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// app styles & assets
import './LandingPageNav.scss'
// other sub components
import SignUpButton from '../SignUpButton/SignUpButton';
import LogoutButton from '../LogoutButton/LogoutButton';

const LandingPageNav = () => {

    const [mobileMenu, setMobileMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMobileMenu = () => {
        let isMobileMenu = mobileMenu ? false : true;
        setMobileMenu(isMobileMenu);
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) setIsLoggedIn(true);
    }, [])

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <nav className='fixed-navbar'>
            <Link to={'./'} className='fixed-navbar__logo'>Food Bunnies</Link>
            <ul className={`fixed-navbar__menu ${ mobileMenu ? 'fixed-navbar__menu--active' : '' }`}> 
                <li className='fixed-navbar__item'>
                    <a className='fixed-navbar__link' href='/#about'>About</a>
                </li>
                <li className='fixed-navbar__item'>
                    <a className='fixed-navbar__link' href='/#features'>Features</a>
                </li>
                <li className='fixed-navbar__item'>
                    {isLoggedIn ? <div>Welcome!</div> : <SignUpButton/>}
                </li>
                {isLoggedIn ? 
                (<li className='fixed-navbar__item'>
                    <LogoutButton handleLogout={ handleLogout } />
                </li>) : 
                (<li className='fixed-navbar__item'>
                        <Link to={'/login'}>
                            <button className='fixed-navbar__button fixed-navbar__button--login'>
                                Log in
                            </button>
                        </Link>
                </li>)
                }
            </ul>
            <div className={`hamburger ${ mobileMenu ? 'hamburger--active' : '' }`} onClick={ toggleMobileMenu }> 
                <span className='hamburger__bar'></span>
                <span className='hamburger__bar'></span>
                <span className='hamburger__bar'></span>
            </div>
        </nav>
    );
}
 
export default LandingPageNav;
