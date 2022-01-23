import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logos/logo_transparent.png'
import './Header.scss'


export default class Header extends Component {
    state = {
    }

    render() {
        return (
            <header className='header'>
                <Link to='/'><img  className='header__logo' src={Logo} alt='logo' /></Link>
                <nav className='header__links'>
                  <Link to='/' className='header__link header__link--active'>Dashboard</Link>
                  <Link to='/' className='header__link'>Switch to Driver view</Link>
                  <dir>Welcome, Huy</dir>
                </nav>
            </header>
        )
    }
}
