// React modules
import React, { Component } from 'react';
// app styles & assets
import './ModalCandidates.scss'
import iconArrowBack from '../../assets/Icons/arrow_back-24px.svg'
import iconArrowNext from '../../assets/Icons/arrow_next.svg'
import profilePic from '../../assets/images/rabbids.png'
// 3rd party libraries
import axios from 'axios'


export default class ModalCandidates extends Component {

    // apiURL = process.env.REACT_APP_API_URL
    api_url = 'http://localhost:8080/api'

    state = {
        curCandidateIndex: 0,
        candidatesRatings: [],
    }

    retrieveCandidateScore = () => {

    }

    fetchRatingsForCandidate = (candidateID) => {
        const token = this.props.retrieveToken();
        let sumScore = 0;
        let totalNumbers = 0;
        axios.get(`${this.api_url}/reviews/${candidateID}/all-reviews`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let records = response.data;
            records.forEach(obj => {
                sumScore += obj.score;
                totalNumbers += 1;
            })
            let avgScore = (sumScore === 0) || (records === []) ? 'No ratings' : Math.round((sumScore / totalNumbers) * 10) / 10;
            // let driverScore = {
            //     candidateID: avgScore
            // }
            let curList = this.state.candidatesRatings;
            // curList.push(driverScore);
            curList[candidateID] = avgScore;
            this.setState({
                candidatesRatings: curList,
            }) 
        }).catch(() => {
            console.log('Unable to fetch candidates for this user')
        });
        // fetch cur Candidate score here
    }

    componentDidMount = () => {
        if (this.props.candidates) {
            this.props.candidates.forEach(item => {
                this.fetchRatingsForCandidate(item.candidate_id)
            });
        }
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
            !this.props.candidates ? <div className={ showHideClassName }>No candidates</div> : 
            (<div className={ showHideClassName }>
                <section className='modal-candidates__main'>
                    <div>
                        <div className='modal-candidates__header'>
                            <div className={this.state.curCandidateIndex === 0 ? 'modal-candidates__icon modal-candidates__icon--inactive' : 'modal-candidates__icon'} onClick={ () => this.cycleCandidate('back')}>
                                <img src={ iconArrowBack } alt='next' />
                            </div>
                            <p>
                                {this.state.curCandidateIndex + 1}/{this.props.candidates.length}
                            </p>
                            <div className={this.state.curCandidateIndex === this.props.candidates.length - 1 ? 'modal-candidates__icon modal-candidates__icon--inactive' : 'modal-candidates__icon'} onClick={ () => this.cycleCandidate('next')} >
                                <img src={ iconArrowNext } alt='next' />
                            </div>
                        </div>
                        <h1 className='modal-candidates__title'>{ this.props.candidates[this.state.curCandidateIndex].name }</h1>
                        <div className='modal-candidates__profile-pic-container'>
                            <img className='modal-candidates__profile-pic' src={ profilePic } alt='candidate' />
                        </div>
                        <div className='modal-candidates__rating-container'>
                            <div className='modal-candidates__driver-number'>Registration number: { this.props.candidates[this.state.curCandidateIndex].candidate_id }</div>
                            
                            {/* {this.state.candidatesRatings[this.props.candidates[this.state.curCandidateIndex].candidate_id] === 'N.A.' ? 
                            <div className='modal-candidates__rating-score'>No ratings yet</div> : 
                            <div className='modal-candidates__rating-score'>{ this.state.candidatesRatings[this.props.candidates[this.state.curCandidateIndex].candidate_id] } out of 5 ★</div>
                            } */}
                            <div className='modal-candidates__rating-score'>{ this.state.candidatesRatings[this.props.candidates[this.state.curCandidateIndex].candidate_id] } out of 5 ★</div>
                        </div>
                        <p className='modal-candidates__offer'>I can do this for ${ 
                        this.props.candidates[this.state.curCandidateIndex].offer }</p>
                    </div>
                    <div className='modal-candidates__buttons-group'>
                        <button className='modal-candidates__button modal-candidates__button--accept' type='button' onClick={ () => this.props.updateAcceptedDriver(this.props.candidates[this.state.curCandidateIndex].candidate_id) }>Accept</button>
                    </div>
                    <div className='modal-candidates__cancel' onClick={ this.props.handleClose }>
                        <p>CANCEL - DECIDE LATER</p>
                    </div>
                </section>
            </div>)
        );
    }
}
