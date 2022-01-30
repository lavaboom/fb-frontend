// React modules
import React, { Component } from 'react';
// app styles & assets
import './ModalAddTrip.scss'
import iconClose from '../../assets/Icons/close-24px.svg'
// 3rd party libraries
import axios from 'axios'

export default class ModalAddTrip extends Component {

    handleEdit = (event) => {
        event.preventDefault();
        const token = this.props.retrieveToken();
        let datetime = event.target.jobDate.value + ' ' + event.target.jobTime.value;
        axios.put(`http://localhost:8080/api/trips/${this.props.modalTrip.id}`, {
            origin: event.target.origin.value,
            destination: event.target.destination.value,
            job_date: datetime,
            note: event.target.note.value,
            payment_type: event.target.paymentType.value,
            payment_amount: event.target.pay.value
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            console.log(`editted ${response.data} row`);
            // close the modal
            this.props.handleClose();
            // fetch trips again
            this.props.fetchTrips();
        })
        .catch((error) => {
            console.log(error)
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const token = this.props.retrieveToken();
        let datetime = event.target.jobDate.value + ' ' + event.target.jobTime.value;
        axios.post('http://localhost:8080/api/trips/add', {
            sender_id: this.props.user.id,
            origin: event.target.origin.value,
            destination: event.target.destination.value,
            date_posted: new Date(),
            job_date: datetime,
            note: event.target.note.value,
            payment_type: event.target.paymentType.value,
            payment_amount: event.target.pay.value
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            console.log(response);
            // close the modal
            this.props.handleClose();
            // fetch trips again
            this.props.fetchTrips();                
        })
        .catch((error) => {
            console.log(error)
        });
    };

    render() {
        // console.log(this.props.modalTrip)
        let showHideClassName = this.props.show ? 'modal-add modal-add--display-block' : 'modal-add modal-add--display-none';

        let jobDate = null;
        let jobTime = null;
        if (this.props.modalTrip.job_date) {
            let formatted = new Date(this.props.modalTrip.job_date);
            let year = formatted.getFullYear();
            let month = formatted.getMonth();
            let day = formatted.getDate();
            let hour = formatted.getHours();
            let minutes = formatted.getMinutes();
            jobDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            jobTime = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
        }

        return (
        <div className={ showHideClassName }>
        <section className='modal-add__main'>
            
            <div className='modal-add__close-icon'>
                <img src={ iconClose } alt='close' onClick={ this.props.handleClose } />
            </div>
            <h1 className='modal-add__title'>Add a trip</h1>
            
            {/* form */}
            <form className='modal-add__input-form' onSubmit={ this.props.modalTrip.origin ? this.handleEdit : this.handleSubmit }>
                <div className='modal-add__input-group'>
                    <label htmlFor='origin'>Origin</label>
                    <input className='modal-add__input-field' type='text' name='origin' id='origin' 
                        defaultValue={ this.props.modalTrip.origin || '' } />
                </div>
                <div className='modal-add__input-group'>
                    <label htmlFor='destination'>Destination</label>
                    <input className='modal-add__input-field' type='text' name='destination' id='destination' 
                        defaultValue={ this.props.modalTrip.destination || '' } />
                </div>
                <div className='modal-add__input-group'>
                    <label htmlFor='note'>Note for driver</label>
                    <input className='modal-add__input-field' type='text' name='note' id='note' placeholder='Leave at door' 
                        defaultValue={ this.props.modalTrip.note || '' } />
                </div>
                
                {/* date & time group */}
                <div className='modal-add__datetime'>
                    <div className='modal-add__input-group modal-add__datetime-item'>
                        <label htmlFor='jobDate'>Job Date</label>
                        <input className='modal-add__input-field' type='date' name='jobDate' id='jobDate' 
                        defaultValue={ jobDate || '' } />
                    </div>
                    <div className='modal-add__input-group modal-add__datetime-item'>
                        <label htmlFor='jobTime'>Time</label>
                        <input className='modal-add__input-field' type='time' name='jobTime' id='jobTime' 
                        defaultValue={ jobTime || '' } />
                    </div>
                </div>
                
                <div className='modal-add__input-group'>
                    <p>Paid by</p>
                    <div className='wrapper'>
                        <input type='radio' name='paymentType' id='option-1' value={ 'Sender' } 
                            defaultChecked />
                        <input type='radio' name='paymentType' id='option-2' value={ 'Recipient' } />
                        <label htmlFor='option-1' className='option option-1'>
                            <span>Sender</span>
                        </label>
                        <label htmlFor='option-2' className='option option-2'>
                            <span>Recipient</span>
                        </label>
                    </div>
                </div>
                <div className='modal-add__input-group'>
                    <label htmlFor='pay'>Pay</label>
                    <input className='modal-add__input-field' type='number' name='pay' id='pay' 
                        defaultValue={ this.props.modalTrip.payment_amount || '' } />
                </div>
                <div className='modal-add__buttons-group'>
                    <button className='modal-add__button modal-add__button--cancel' type='button' onClick={ this.props.handleClose }>Cancel</button>
                    <button className='modal-add__button modal-add__button--add'  type='submit'>
                        { this.props.modalTrip.origin ? 'EDIT' : 'ADD' }
                    </button>
                </div>
            </form>
        </section>
        </div>
    );
  }
}
