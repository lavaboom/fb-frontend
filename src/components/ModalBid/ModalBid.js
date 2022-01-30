// React modules
import React from 'react'
// app styles & assets
import './ModalBid.scss'
import iconClose from '../../assets/Icons/close-24px.svg'

export default function ModalBid({ handleClose, show, modalTrip, bidFunction }) {
    const showHideClassName = show ? 'modal-bid modal-bid--display-block' : 'modal-bid modal-bid--display-none';

    const handleSubmit = (event) => {
        event.preventDefault();
        bidFunction(event.target.bid.value);
    }

    return (
        <div className={ showHideClassName }>
        <form className='modal-bid__main' onSubmit={ handleSubmit }>
            <div>
                <div className='modal-bid__close-icon'>
                    <img src={ iconClose } alt='close' onClick={ handleClose } />
                </div>
                <h1 className='modal-bid__title'>Sender offered { modalTrip ? modalTrip.payment_amount: '' }. Bid?</h1>
                <input type='number' name='bid' defaultValue={ modalTrip ? modalTrip.payment_amount : '' } />
            </div>
            <div className='modal-bid__buttons-group'>
                <button className='modal-bid__button modal-bid__button--cancel' type='button' onClick={ handleClose }>Cancel</button>
                <button className='modal-bid__button modal-bid__button--bid' type='submit'>Bid</button>
            </div>
        </form>
        </div>
    );
}
