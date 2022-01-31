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
            <header className='header'>
                <nav className='navbar'>
                    <a href='#' className='navbar__logo'>Food Bunnies</a>
                    <ul className={`navbar__menu ${ this.state.mobileMenu ? 'navbar__menu--active' : '' }`}> 
                        <li className='navbar__item'>
                            <a href='#' className='navbar__link' onClick={ this.toggleMobileMenu }>Switch to { this.props.user.user_type === 'Kitchen' ? 'Driver' : 'Kitchen'} view</a>
                        </li>
                        <li className='navbar__item'>
                            <p>Welcome, { this.props.user.name }</p>
                        </li>
                        <li className='navbar__item'>
                        <button className='navbar__button' onClick={ this.props.handleLogout }>
                            Log out
                        </button>
                        </li>
                    </ul>
                    <div className={`hamburger ${ this.state.mobileMenu ? 'hamburger--active' : '' }`} onClick={ this.toggleMobileMenu }> 
                        <span className='hamburger__bar'></span>
                        <span className='hamburger__bar'></span>
                        <span className='hamburger__bar'></span>
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
