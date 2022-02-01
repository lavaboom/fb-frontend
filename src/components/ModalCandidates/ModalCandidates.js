// React modules
import React, { Component } from 'react';
// app styles & assets
import './ModalCandidates.scss'
import iconArrowBack from '../../assets/Icons/arrow_back-24px.svg'
import iconArrowNext from '../../assets/Icons/arrow_next.svg'
import iconStar from '../../assets/Icons/star.svg'
import profilePic from '../../assets/images/rabbids.png'


export default class ModalCandidates extends Component {

    state = {
        curCandidateIndex: 0,
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
        // let curCandidate = this.props.candidates;
        // console.log(curCandidate)
        // return (
        //     <div className={showHideClassName}>
        //         { this.props.candidates ? <p>{this.props.candidates[0].name}</p> : <p>pending</p>}
        //     </div>
        // );

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
                            <img className='modal-candidates__rating-star modal-candidates__rating-star--filled' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
                            <img className='modal-candidates__rating-star' src={ iconStar } alt='rating' />
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
