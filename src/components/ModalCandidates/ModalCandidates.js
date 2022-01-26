// React modules
import React, { Component } from 'react';
// app styles & assets
import './ModalCandidates.scss'
import iconArrowBack from '../../assets/Icons/arrow_back-24px.svg'
import iconStar from '../../assets/Icons/star.svg'
import profilePic from '../../assets/images/profile_pic.jpeg'


export default class ModalCandidates extends Component {

    state = {

    }

    showHideClassName = this.props.show ? 'modal modal--display-block' : 'modal modal--display-none';
    
    render() {
        return (
            <div className={ this.showHideClassName }>
            <section className='modal__main'>
                <div>
                    <div>
                        <div className='modal__back-icon'>
                            <img src={ iconArrowBack } alt='next' />
                        </div>
                        <div className='modal__next-icon'>
                            <img src={ iconArrowBack } alt='next' />
                        </div>
                    </div>
                    <h1 className='modal__title'>Vincent Kompany</h1>
                    <img className='modal__profile-pic' src={ profilePic } alt='profile picture' />
                    <div className='modal__rating'>
                        <img src={ iconStar } alt='rating' />
                        <img src={ iconStar } alt='rating' />
                        <img src={ iconStar } alt='rating' />
                        <img src={ iconStar } alt='rating' />
                        <img src={ iconStar } alt='rating' />
                    </div>
                    <p>I can do this for $70</p>
                </div>
                <div className='modal__buttons-group'>
                    <button className='modal__button modal__button--cancel' type='button'>Accept</button>
                    <button className='modal__button modal__button--delete' type='button'>Decline</button>
                </div>
                <div className='modal__buttons-group'>
                    <button className='modal__button modal__button--cancel' type='button' onClick={ this.props.handleClose }>Decide Later</button>
                </div>
            </section>
            </div>
        );
    }
}


// export default function ModalCandidates({ handleClose, show, modalItem, deleteFunction }) {

//     const showHideClassName = show ? 'modal modal--display-block' : 'modal modal--display-none';

//     return (
//         <div className={ showHideClassName }>
//         <section className='modal__main'>
//             <div>
//                 <div>
//                     <div className='modal__back-icon'>
//                         <img src={ iconArrowBack } alt='next' />
//                     </div>
//                     <div className='modal__next-icon'>
//                         <img src={ iconArrowBack } alt='next' />
//                     </div>
//                 </div>
//                 <h1 className='modal__title'>Vincent Kompany</h1>
//                 <img className='modal__profile-pic' src={ profilePic } alt='profile picture' />
//                 <div className='modal__rating'>
//                     <img src={ iconStar } alt='rating' />
//                     <img src={ iconStar } alt='rating' />
//                     <img src={ iconStar } alt='rating' />
//                     <img src={ iconStar } alt='rating' />
//                     <img src={ iconStar } alt='rating' />
//                 </div>
//                 <p>I can do this for $70</p>
//             </div>
//             <div className='modal__buttons-group'>
//                 <button className='modal__button modal__button--cancel' type='button'>Accept</button>
//                 <button className='modal__button modal__button--delete' type='button'>Decline</button>
//             </div>
//             <div className='modal__buttons-group'>
//                 <button className='modal__button modal__button--cancel' type='button' onClick={ handleClose }>Decide Later</button>
//             </div>
//         </section>
//         </div>
//     );
// }
