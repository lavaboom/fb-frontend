import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logos/InStock-Logo.svg'
import './Header.scss'


export default class Header extends Component {
    state = {
        isWarehouse: true
    }

    componentDidMount = () => {
        let pathname = window.location.href;
        if (pathname.includes('Inventory')) {
            this.setState({
                isWarehouse: false
            })
        }
    }

    setWarehouse = () => {
        this.setState({isWarehouse: true})
    }

    setInventory = () => {
        this.setState({isWarehouse: false})
    }

    render() {
        console.log(this.state.page)
        return (
            <header className='header'>
                <Link onClick={this.setWarehouse} to='/' className='header__logo'><img  src={Logo} alt="inStock Logo" /></Link>
                <nav className='header__links'>
                  <Link onClick={this.setWarehouse} to='/' className={this.state.isWarehouse ? 'header__link header__link--active' : 'header__link'}>Warehouses</Link>
                  <Link onClick={this.setInventory} to='/Inventory' className={!this.state.isWarehouse ? 'header__link header__link--active' : 'header__link'}>Inventory</Link>
                </nav>
            </header>
        )
    }
}
