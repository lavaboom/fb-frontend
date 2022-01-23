// React modules
import React, { Component } from 'react'
// app styles & assets
import './KitchenDashboard.scss'
import iconDelete from '../../assets/Icons/delete_outline-24px.svg'
import iconEdit from '../../assets/Icons/edit-24px.svg'
import iconChevron from '../../assets/Icons/chevron_right-24px.svg'
import iconSort from '../../assets/Icons/sort-24px.svg'
// other sub components
import Modal from '../Modal/Modal'
// 3rd party libraries
import axios from 'axios'

export default class WarehouseList extends Component {

    // static variables 
    apiURL = process.env.REACT_APP_API_URL

    state = {
        showModal: false,
        modalWarehouse: '',
        filtered: [],
        originalWarehouses: [],
        warehouses: null
    }

    // functionality for the search input
    search = (e) => {
        let value = e.target.value;
        let result = [];
        // start searching if input > 2
        if (value.length > 2) { 
            this.state.filtered.forEach(row => {
                for (let id in row) {
                    let sanitizedValue = row[id].toLowerCase();
                    if (sanitizedValue.indexOf(value.toLowerCase()) > -1) {
                        result.push(id);
                    }
                }
            })
            let newList = this.state.warehouses.filter(row => {
                return result.indexOf(row.id) > -1
            })
            this.setState({ warehouses: newList })
        } else {
            this.setState({ warehouses: this.state.originalWarehouses })
        }
    }

    // funtions to control modal
    showModal = (warehouse) => {
        this.setState({ showModal: true, modalWarehouse: warehouse });
    };
    
    hideModal = () => {
        this.setState({ showModal: false });
    };

    // combine values for search
    generateSearchData = (data) => {
        let result = []
        data.forEach(warehouse => {
            let record = {}
            let searchData = `${warehouse.name} ${warehouse.address} ${warehouse.city} ${warehouse.country} ${warehouse.contact.name} ${warehouse.contact.email}`
            record[warehouse.id] = searchData;
            result.push(record)
        })
        return result
    }

    // function to GET all warehouses
    getAllWarehouses = () => {
        axios.get(this.apiURL + 'warehouse/')
        .then(response => {
            this.setState({
                warehouses: response.data,
                originalWarehouses: response.data,
                filtered: this.generateSearchData(response.data)
            })
        })
        .catch(apiError => { console.log(apiError) });
    };

    // function to delete the modal's target warehouse
    deleteWarehouse = () => {
        // request server to delete this warehouse
        axios.delete(this.apiURL + 'warehouse/' + this.state.modalWarehouse.id)
        .then(response => {
            // set the state with the new list of warehouses
            this.setState({
                warehouses: response.data,
                originalWarehouses: response.data,
                filtered: this.generateSearchData(response.data)
            })
        })
        .catch(error => { console.log(error) });
        
        // close the modal
        this.setState({ showModal: false });
    }

    // fetch list of warehouses from server and set in state
    componentDidMount() {
        this.getAllWarehouses();
    }

    render() {
        return (
            !this.state.warehouses ? <p>Server is offline. Please try again later</p> : 
            (<div>
                {/* Modal */}
                <Modal show={ this.state.showModal } handleClose={ this.hideModal } modalItem={ this.state.modalWarehouse } deleteFunction={ this.deleteWarehouse } />
                {/* header area */}
                <div className='table-functionalities'>
                    <h1 className='table-functionalities__title'>Warehouses</h1>
                    <div className="table-functionalities__wrapper">
                        <input className='table-functionalities__search' onChange={ this.search } type='text' placeholder='Search...' />
                        <a href='/Warehouse/add' className='table-functionalities__add'>+ Add New Warehouse</a>                    
                    </div>
                </div>
                {/* table area */}
                <div className='table'>
                    <div className='table__header'>
                        <h4 className='table__header-item table__header-item--warehouse'>WAREHOUSE <img className='table__inline-icon' src={ iconSort } alt='sort' /></h4>
                        <h4 className='table__header-item table__header-item--address'>ADDRESS <img className='table__inline-icon' src={ iconSort } alt='sort' /></h4>
                        <h4 className='table__header-item table__header-item--contact-name'>CONTACT NAME <img className='table__inline-icon' src={ iconSort } alt='sort' /></h4>
                        <h4 className='table__header-item table__header-item--contact-info'>CONTACT INFORMATION <img className='table__inline-icon' src={ iconSort } alt='sort' /></h4>
                        <h4 className='table__header-item table__header-item--actions'>ACTIONS</h4>
                    </div>
                    { this.state.warehouses.map(warehouse => (
                            // each row of the table
                            <div key={ warehouse.id } className='table__row'>
                                {/* warehouse name */}
                                <div className='table__cell table__cell--warehouse'>
                                    <div className='table__label'>WAREHOUSE</div>
                                    <div>
                                        <a href={`/warehouse/${warehouse.id}`} className='table__link'>
                                            { warehouse.name } 
                                            <span className='table__inline-icon'><img src={ iconChevron } alt='chevron' /></span>
                                        </a>
                                    </div>
                                </div>
                                {/* warehouse contact name */}
                                <div className='table__cell table__cell--contact-name'>
                                    <div className='table__label'>CONTACT NAME</div>
                                    <div>{ warehouse.contact.name }</div>
                                </div>
                                {/* warehouse address */}
                                <div className='table__cell table__cell--address'>
                                    <div className='table__label'>ADDRESS</div>
                                    <div>{ warehouse.address }, { warehouse.city }, { warehouse.country }</div>
                                </div>
                                {/* warehouse contact phone and email */}
                                <div className='table__cell table__cell--contact-info'>
                                    <div className='table__label'>CONTACT INFORMATION</div>
                                    <div>{ warehouse.contact.phone } { warehouse.contact.email }</div>
                                </div>
                                <div className='table__action-wrapper'>
                                    <img src={ iconDelete } alt='delete' onClick={ () => this.showModal(warehouse) } />
                                    <a href={`/Warehouse/${warehouse.id}/edit`}><img src={ iconEdit } alt='edit' /></a>
                                    
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>)
        )
    }
}
