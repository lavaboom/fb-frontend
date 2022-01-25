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
            <header class="header">
                <nav class="navbar">
                    <a href="#" class="nav-logo">WebDev.</a>
                    <ul class={`nav-menu ${ this.state.mobileMenu ? 'active' : '' }`}> 
                        <li class="nav-item">
                        <a href='#' class='nav-link' onClick={ this.toggleMobileMenu }>Services</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" onClick={ this.toggleMobileMenu }>Blog</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" onClick={ this.toggleMobileMenu }>About</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" onClick={ this.toggleMobileMenu }>Contact</a>
                        </li>
                    </ul>
                    <div class={`hamburger ${ this.state.mobileMenu ? 'active' : '' }`} onClick={ this.toggleMobileMenu }> 
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
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
