// React modules
import React from 'react'
// app styles & assets
import './ModalAddTrip.scss'
import iconClose from '../../assets/Icons/close-24px.svg'

export default function ModalAddTrip({ handleClose, show }) {
    const showHideClassName = show ? 'modal modal--display-block' : 'modal modal--display-none';

    return (
        <div className={ showHideClassName }>
        <section className='modal__main'>
            
            <div className='modal__close-icon'>
                <img src={ iconClose } alt='close' onClick={ handleClose } />
            </div>
            <h1 className='modal__title'>Add a trip</h1>
            {/* form */}
            <form className='modal__input-form' action=''>
                <div className='modal__input-group'>
                    <label htmlFor='origin'>Origin</label>
                    <input className='modal__input-field' type='text' name='origin' id='origin' />
                </div>
                <div className='modal__input-group'>
                    <label htmlFor='destination'>Destination</label>
                    <input className='modal__input-field' type='text' name='destination' id='destination' />
                </div>
                <div className='modal__input-group'>
                    <label htmlFor='note'>Note for driver</label>
                    <input className='modal__input-field' type='text' name='note' id='note' placeholder='Leave at door' />
                </div>
                <div className='modal__input-group'>
                    <label htmlFor='jobDate'>Job Date</label>
                    <input className='modal__input-field' type='date' name='jobDate' id='jobDate' />
                </div>

                <div className='modal__input-group'>
                <p>Paid by</p>
                <div className="wrapper">
                    <input type="radio" name="select" id="option-1" defaultChecked/>
                    <input type="radio" name="select" id="option-2"/>
                    <label htmlFor="option-1" className="option option-1">
                        <span>Sender</span>
                    </label>
                    <label htmlFor="option-2" className="option option-2">
                        <span>Recipient</span>
                    </label>
                </div>



                </div>
                
                <div className='modal__input-group'>
                    <label htmlFor='pay'>Pay</label>
                    <input className='modal__input-field' type='number' name='pay' id='pay' />
                </div>
            </form>
            <div className='modal__buttons-group'>
                <button className='modal__button modal__button--cancel' type='button' onClick={ handleClose }>Cancel</button>
                <button className='modal__button modal__button--add' type='button' onClick={ () => {} }>Delete</button>
            </div>
        </section>
        </div>
    );
}
