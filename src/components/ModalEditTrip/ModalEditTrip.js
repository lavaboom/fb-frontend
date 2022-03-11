// React modules
import React from 'react';
// app styles & assets
import './ModalEditTrip.scss'
import iconClose from '../../assets/Icons/close-24px.svg'
// redux
import { useDispatch } from 'react-redux';
import { editTrip } from '../../store/slices/trips';

const ModalEditTrip = (props) => {

    /* -------------------------------------------------------------------------
    setup redux and local variable
    ------------------------------------------------------------------------- */
    const dispatch = useDispatch();

    let showHideClassName = props.show ? 'modal-add modal-add--display-block' : 'modal-add modal-add--display-none';

    let jobDate = null;
    let jobTime = null;
    if (props.modalTrip.job_date) {
        let formatted = new Date(props.modalTrip.job_date);
        let year = formatted.getFullYear();
        let month = formatted.getMonth();
        let day = formatted.getDate();
        let hour = formatted.getHours();
        let minutes = formatted.getMinutes();
        jobDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        jobTime = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    /* -------------------------------------------------------------------------
    event handlers
    ------------------------------------------------------------------------- */
    const handleEdit = (event) => {
        event.preventDefault();
        const datetime = event.target.jobDate.value + ' ' + event.target.jobTime.value;
        const data = {
            origin: event.target.origin.value,
            destination: event.target.destination.value,
            job_date: datetime,
            note: event.target.note.value,
            payment_type: event.target.paymentType.value,
            payment_amount: event.target.pay.value
        };
        dispatch(editTrip(props.modalTrip.id, data));
        props.handleClose();
    };

    return (
        <div className={ showHideClassName }>
        <section className='modal-add__main'>
            
            <div className='modal-add__close-icon'>
                <img src={ iconClose } alt='close' onClick={ props.handleClose } />
            </div>
            <h1 className='modal-add__title'>Edit trip</h1>
            
            {/* form */}
            <form className='modal-add__input-form' onSubmit={ handleEdit }>
                <div className='modal-add__input-group'>
                    <label className='modal-add__visible-label' htmlFor='origin'>Origin</label>
                    <input className='modal-add__input-field modal-add__input-field--no-border' type='text' name='origin' id='origin' 
                        defaultValue={ props.modalTrip.origin || '' } />
                </div>
                <div className='modal-add__input-group'>
                    <label className='modal-add__visible-label' htmlFor='destination'>Destination</label>
                    <input className='modal-add__input-field modal-add__input-field--no-border' type='text' name='destination' id='destination' 
                        defaultValue={ props.modalTrip.destination || '' } />
                </div>
                <div className='modal-add__input-group'>
                    <label className='modal-add__visible-label' htmlFor='note'>Note for driver</label>
                    <input className='modal-add__input-field modal-add__input-field--no-border' type='text' name='note' id='note' placeholder='Leave at door' 
                        defaultValue={ props.modalTrip.note || '' } />
                </div>
                
                {/* date & time group */}
                <div className='modal-add__datetime'>
                    <div className='modal-add__input-group modal-add__datetime-item'>
                        <label className='modal-add__visible-label' htmlFor='jobDate'>Job Date</label>
                        <input className='modal-add__input-field modal-add__input-field--no-border' type='date' name='jobDate' id='jobDate' 
                        defaultValue={ jobDate || '' } />
                    </div>
                    <div className='modal-add__input-group modal-add__datetime-item'>
                        <label className='modal-add__visible-label' htmlFor='jobTime'>Time</label>
                        <input className='modal-add__input-field modal-add__input-field--no-border' type='time' name='jobTime' id='jobTime' 
                        defaultValue={ jobTime || '' } />
                    </div>
                </div>
                
                <div className='modal-add__input-group'>
                    <p className='modal-add__subheader'>Paid by</p>
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
                    <label className='modal-add__visible-label' htmlFor='pay'>How much will you pay delivery driver?</label>
                    <input className='modal-add__input-field modal-add__input-field--no-border' type='number' name='pay' id='pay' 
                        defaultValue={ props.modalTrip.payment_amount || '' } />
                </div>
                <div className='modal-add__buttons-group'>
                    <button className='modal-add__button modal-add__button--cancel' type='button' onClick={ props.handleClose }>Cancel</button>
                    <button className='modal-add__button modal-add__button--add'  type='submit'>
                        { props.modalTrip.origin ? 'EDIT' : 'ADD' }
                    </button>
                </div>
            </form>
        </section>
        </div>
    );
}
 
export default ModalEditTrip;
