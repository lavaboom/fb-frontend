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
        // fetch all candidates for this trip (trip.id === this.props.data.id)
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
        let showHideClassName = this.props.show ? 'modal-candidates modal-candidates--display-block' : 'modal-candidates modal-candidates--display-none';
        return (
            !this.state.candidates ? <div className={ showHideClassName }>No candidates</div> : 
            (<div className={ showHideClassName }>
                <section className='modal-candidates__main'>
                    <div>
                        <div className='modal-candidates__header'>
                            <div className={this.state.curCandidateIndex === 0 ? 'modal-candidates__icon modal-candidates__icon--inactive' : 'modal-candidates__icon'} onClick={ () => this.cycleCandidate('back')}>
                                <img src={ iconArrowBack } alt='next' />
                            </div>
                            <p>
                                {this.state.curCandidateIndex + 1}/{this.state.candidates.length}
                            </p>
                            <div className={this.state.curCandidateIndex === this.state.candidates.length - 1 ? 'modal-candidates__icon modal-candidates__icon--inactive' : 'modal-candidates__icon'} onClick={ () => this.cycleCandidate('next')} >
                                <img src={ iconArrowNext } alt='next' />
                            </div>
                        </div>
                        <h1 className='modal-candidates__title'>Vincent Kompany</h1>
                        <div className='modal-candidates__profile-pic-container'>
                            <img className='modal-candidates__profile-pic' src={ profilePic } alt='profile picture' />
                        </div>
                        <div className='modal-candidates__rating-container'>
                            <img className='modal-candidates__rating-star modal-candidates__rating-star--filled' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
                        </div>
                        <p className='modal-candidates__offer'>I can do this for ${ 
                        this.state.candidates[this.state.curCandidateIndex].offer }</p>
                    </div>
                    <div className='modal-candidates__buttons-group'>
                        <button className='modal-candidates__button modal-candidates__button--accept' type='button'>Accept</button>
                        <button className='modal-candidates__button modal-candidates__button--delete' type='button' onClick={ () => this.removeCandidate(this.state.curCandidateIndex) }>Decline</button>
                    </div>
                    <div className='modal-candidates__cancel' onClick={ this.props.handleClose }>
                        <p>CANCEL - DECIDE LATER</p>
                    </div>
                </section>
            </div>)
        );
    }
}
