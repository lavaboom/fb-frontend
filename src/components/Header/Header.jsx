import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logos/logo_transparent.png'
import './Header.scss'


export default class Header extends Component {
    state = {
        mobileMenu: false,
    }

    toggleMobileMenu = () => {
        let newValue = this.state.mobileMenu ? false : true;
        this.setState({ mobileMenu: newValue })
    }

    render() {
        return (
            <header class='header'>
                <nav class='navbar'>
                    <a href='#' class='navbar__logo'>Food Bunnies</a>
                    <ul class={`navbar__menu ${ this.state.mobileMenu ? 'navbar__menu--active' : '' }`}> 
                        <li class='navbar__item'>
                        <a href='#' class='navbar__link' onClick={ this.toggleMobileMenu }>Services</a>
                        </li>
                        <li class='navbar__item'>
                            <a href='#' class='navbar__link' onClick={ this.toggleMobileMenu }>Blog</a>
                        </li>
                        <li class='navbar__item'>
                            <a href='#' class='navbar__link' onClick={ this.toggleMobileMenu }>About</a>
                        </li>
                        <li class='navbar__item'>
                            <a href='#' class='navbar__link' onClick={ this.toggleMobileMenu }>Contact</a>
                        </li>
                        <li class='navbar__item'>
                            <p>Hi, Huy</p>
                        </li>
                    </ul>
                    <div class={`hamburger ${ this.state.mobileMenu ? 'hamburger--active' : '' }`} onClick={ this.toggleMobileMenu }> 
                        <span class='hamburger__bar'></span>
                        <span class='hamburger__bar'></span>
                        <span class='hamburger__bar'></span>
                    </div>
                </nav>
            </header>
            
            // <header className='header'>
            //     <Link to='/'><img className='header__logo' src={Logo} alt='logo' /></Link>
            //     <nav className='header__links'>
            //       <Link to='/' className='header__link header__link--active'>Dashboard</Link>
            //       <Link to='/' className='header__link'>Switch to Driver view</Link>
            //       <dir>Welcome, Huy</dir>
            //     </nav>
            // </header>
        )
    }
}
