// React modules
import React, { Component } from 'react';
// app styles & assets
import './ModalAddTrip.scss'
import iconClose from '../../assets/Icons/close-24px.svg'
// 3rd party libraries
import axios from 'axios'

export default class ModalAddTrip extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        let datetime = event.target.jobDate.value + ' ' + event.target.jobTime.value;
        axios
            .post('http://localhost:8080/api/trips/add', {
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
        let showHideClassName = this.props.show ? 'modal-add modal-add--display-block' : 'modal-add modal-add--display-none';
        
        return (
        <div className={ showHideClassName }>
        <section className='modal-add__main'>
            
            <div className='modal-add__close-icon'>
                <img src={ iconClose } alt='close' onClick={ this.props.handleClose } />
            </div>
            <h1 className='modal-add__title'>Add a trip</h1>
            
            {/* form */}
            <form className='modal-add__input-form' onSubmit={ this.handleSubmit }>
                <div className='modal-add__input-group'>
                    <label htmlFor='origin'>Origin</label>
                    <input className='modal-add__input-field' type='text' name='origin' id='origin' />
                </div>
                <div className='modal-add__input-group'>
                    <label htmlFor='destination'>Destination</label>
                    <input className='modal-add__input-field' type='text' name='destination' id='destination' />
                </div>
                <div className='modal-add__input-group'>
                    <label htmlFor='note'>Note for driver</label>
                    <input className='modal-add__input-field' type='text' name='note' id='note' placeholder='Leave at door' />
                </div>
                
                {/* date & time group */}
                <div className='modal-add__datetime'>
                    <div className='modal-add__input-group modal-add__datetime-item'>
                        <label htmlFor='jobDate'>Job Date</label>
                        <input className='modal-add__input-field' type='date' name='jobDate' id='jobDate' />
                    </div>
                    <div className='modal-add__input-group modal-add__datetime-item'>
                        <label htmlFor='jobTime'>Time</label>
                        <input className='modal-add__input-field' type='time' name='jobTime' id='jobTime' />
                    </div>
                </div>
                
                <div className='modal-add__input-group'>
                    <p>Paid by</p>
                    <div className='wrapper'>
                        <input type='radio' name='paymentType' id='option-1' value={ 'sender' } defaultChecked/>
                        <input type='radio' name='paymentType' id='option-2' value={ 'recipient' }/>
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
                    <input className='modal-add__input-field' type='number' name='pay' id='pay' />
                </div>
                <div className='modal-add__buttons-group'>
                    <button className='modal-add__button modal-add__button--cancel' type='button' onClick={ this.props.handleClose }>Cancel</button>
                    <button className='modal-add__button modal-add__button--add'  type='submit'>ADD</button>
                </div>
            </form>
        </section>
        </div>
    );
  }
}
