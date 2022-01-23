// React modules
import React from 'react'
// app styles & assets
import './Modal.scss'
import iconClose from '../../assets/Icons/close-24px.svg'

export default function Modal({ handleClose, show, modalItem, deleteFunction }) {
    const showHideClassName = show ? 'modal modal--display-block' : 'modal modal--display-none';

    return (
        <div className={ showHideClassName }>
        <section className='modal__main'>
            <div>
                <div className='modal__close-icon'>
                    <img src={ iconClose } alt='close' onClick={ handleClose } />
                </div>
                <h1 className='modal__title'>Delete { modalItem.name } {(modalItem.status) ? " inventory item" : "warehouse"}?</h1>
                <p>Please confirm that you’d like to delete {(modalItem.status) ? `${modalItem.name} from the inventory list`: `the ${modalItem.name} from the list of warehouses`}. You won’t be able to undo this action.</p>
            </div>
            <div className='modal__buttons-group'>
                <button className='modal__button modal__button--cancel' type='button' onClick={ handleClose }>Cancel</button>
                <button className='modal__button modal__button--delete' type='button' onClick={ deleteFunction }>Delete</button>
            </div>
        </section>
        </div>
    );
}
