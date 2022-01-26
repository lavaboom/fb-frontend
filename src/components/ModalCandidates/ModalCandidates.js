// React modules
import React, { Component } from 'react';
// app styles & assets
import './ModalCandidates.scss'
import iconArrowBack from '../../assets/Icons/arrow_back-24px.svg'
import iconArrowNext from '../../assets/Icons/arrow_next.svg'
import iconStar from '../../assets/Icons/star.svg'
import profilePic from '../../assets/images/profile_pic.jpeg'


export default class ModalCandidates extends Component {

    state = {
        curCandidateIndex: 0,
        candidates: [
            {
                "id": 2,
                "trip_id": 2,
                "candidate_id": 7,
                "offer": 99,
                "candidate_status": "Pending",
                "sender_id": 1,
                "driver_id": null,
                "origin": "Toronto",
                "destination": "Hamilton",
                "date_posted": "2022-01-26T17:23:21.000Z",
                "job_date": "2022-12-12T08:24:00.000Z",
                "status": "NEW",
                "payment_type": "Paid by Recipient",
                "payment_amount": 20
            },
            {
                "id": 2,
                "trip_id": 2,
                "candidate_id": 2,
                "offer": 10,
                "candidate_status": "Pending",
                "sender_id": 1,
                "driver_id": null,
                "origin": "Toronto",
                "destination": "Hamilton",
                "date_posted": "2022-01-26T17:23:21.000Z",
                "job_date": "2022-12-12T08:24:00.000Z",
                "status": "NEW",
                "payment_type": "Paid by Recipient",
                "payment_amount": 20
            },
            {
                "id": 2,
                "trip_id": 2,
                "candidate_id": 5,
                "offer": 18,
                "candidate_status": "Pending",
                "sender_id": 1,
                "driver_id": null,
                "origin": "Toronto",
                "destination": "Hamilton",
                "date_posted": "2022-01-26T17:23:21.000Z",
                "job_date": "2022-12-12T08:24:00.000Z",
                "status": "NEW",
                "payment_type": "Paid by Recipient",
                "payment_amount": 20
            }
        ]
    }

    componentDidMount = () => {
        // fetch all candidates for this trip (trip.id === this.props.modalItem.id)
        //  and set in the state (both candidate id and starting index).
    }

    // TODO: actually remove candidates from the DB
    removeCandidateFromDB = () => {

    }

    removeCandidate = (index) => {
        // if theres on one else left to remove, set candidate to null and close
        if (this.state.candidates.length === 1) {
            let tripID = this.state.candidates[0].id;
            this.setState({
                curCandidateIndex: null,
                candidates: null
            })
            this.props.removeTripWithCandidates(tripID);
            this.props.handleClose();
            return;
        }
        // otherwise, remove candidate at specified index
        let newList = this.state.candidates;
        newList.splice(index, 1);
        // set the new candidate index - always first of list
        this.setState({curCandidateIndex: 0});
    }

    cycleCandidate = (action) => {
        let curCandidateIndex = this.state.curCandidateIndex;
        if (action === 'back') {
            curCandidateIndex -= 1;
        } else if (action === 'next') {
            curCandidateIndex += 1;
        };
        this.setState({
            curCandidateIndex: curCandidateIndex,
        })
    }

    render() {
        let showHideClassName = this.props.show ? 'modal modal--display-block' : 'modal modal--display-none';
        return (
            !this.state.candidates ? <div className={ showHideClassName }>No candidates</div> : 
            (<div className={ showHideClassName }>
                <section className='modal__main'>
                    <div>
                        <div className='modal__header'>
                            <div className={this.state.curCandidateIndex === 0 ? 'modal__icon modal__icon--inactive' : 'modal__icon'} onClick={ () => this.cycleCandidate('back')}>
                                <img src={ iconArrowBack } alt='next' />
                            </div>
                            <p>
                                {this.state.curCandidateIndex + 1}/{this.state.candidates.length}
                            </p>
                            <div className={this.state.curCandidateIndex === this.state.candidates.length - 1 ? 'modal__icon modal__icon--inactive' : 'modal__icon'} onClick={ () => this.cycleCandidate('next')} >
                                <img src={ iconArrowNext } alt='next' />
                            </div>
                        </div>
                        <h1 className='modal__title'>Vincent Kompany</h1>
                        <div className='modal__profile-pic-container'>
                            <img className='modal__profile-pic' src={ profilePic } alt='profile picture' />
                        </div>
                        <div className='modal__rating-container'>
                            <img className='modal__rating-star modal__rating-star--filled' src={ iconStar } alt='rating' />
                            <img className='modal__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal__rating-star' src={ iconStar } alt='rating' />
                        </div>
                        <p className='modal__offer'>I can do this for ${ 
                        this.state.candidates[this.state.curCandidateIndex].offer }</p>
                    </div>
                    <div className='modal__buttons-group'>
                        <button className='modal__button modal__button--accept' type='button'>Accept</button>
                        <button className='modal__button modal__button--delete' type='button' onClick={ () => this.removeCandidate(this.state.curCandidateIndex) }>Decline</button>
                    </div>
                    <div className='modal__cancel' onClick={ this.props.handleClose }>
                        <p>CANCEL - DECIDE LATER</p>
                    </div>
                </section>
            </div>)
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
