// React modules
import React from 'react'
// app styles & assets
import './ModalDelete.scss'
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
                <h1 className='modal__title'>Delete { modalItem.job_date }?</h1>
                <p>Please confirm that you would like to delete {modalItem.job_date}. You will not be able to undo this action.</p>
            </div>
            <div className='modal__buttons-group'>
                <button className='modal__button modal__button--cancel' type='button' onClick={ handleClose }>Cancel</button>
                <button className='modal__button modal__button--delete' type='button' onClick={ deleteFunction }>Delete</button>
            </div>
        </section>
        </div>
    );
}
