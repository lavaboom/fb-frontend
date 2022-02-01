// React modules
import React from 'react'
// app styles & assets
import './ModalDelete.scss'
import iconClose from '../../assets/Icons/close-24px.svg'

export default function Modal({ handleClose, show, data, deleteFunction }) {
    const showHideClassName = show ? 'modal-delete modal-delete--display-block' : 'modal-delete modal-delete--display-none';

    return (
        <div className={ showHideClassName }>
        <section className='modal-delete__main'>
            <div>
                <div className='modal-delete__close-icon'>
                    <img src={ iconClose } alt='close' onClick={ handleClose } />
                </div>
                <h1 className='modal-delete__title'>Delete trip #{ data.id }?</h1>
                <p className='modal-delete__text'>Please confirm that you would like to delete this trip. You will not be able to undo this action.</p>
            </div>
            <div className='modal-delete__buttons-group'>
                <button className='modal-delete__button modal-delete__button--cancel' type='button' onClick={ handleClose }>Cancel</button>
                <button className='modal-delete__button modal-delete__button--delete' type='button' onClick={ deleteFunction }>Delete</button>
            </div>
        </section>
        </div>
    );
}
