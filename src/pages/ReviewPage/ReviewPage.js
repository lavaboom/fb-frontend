// React modules
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
// app styles & assets
import './ReviewPage.scss'
import profilePic from '../../assets/images/rabbids.png'
import iconStar from '../../assets/Icons/star.svg'
// other sub components
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header'
import Icon from '@mdi/react'
import { mdiArrowLeftCircle } from '@mdi/js'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { postReview, fetchUserData } from '../../store/slices/reviews';

const ReviewPge = (props) => {

    /* -------------------------------------------------------------------------
    setup redux and local variable
    ------------------------------------------------------------------------- */
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [ratingDesc, setRatingDesc] = useState('');
    const [redirectToThankYou, setRedirectToThankYou] = useState(false);

    const reviewer = useSelector(state => state.entities.reviews.reviewer);
    const recipient = useSelector(state => state.entities.reviews.recipient);

    useEffect(() => {
        // fetch reviewer and recipient on page load
        dispatch(fetchUserData(props.match.params.driverID));
    }, [])

    /* -------------------------------------------------------------------------
    application logic
    ------------------------------------------------------------------------- */
    const applyRating = (score) => {
        let desc = ['', 'Disappointing', 'Could be better', 
            'OK', 'Very good', 'Exceptional']
        setRating(score);
        setRatingDesc(desc[score]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            authorID: reviewer.id,
            score: rating,
            text: event.target.reviewText.value,
        };
        dispatch(postReview(
            props.match.params.driverID, 
            props.match.params.tripID,
            data
        ));
        setRedirectToThankYou(true);
    };

    /* -------------------------------------------------------------------------
    rendering
    ------------------------------------------------------------------------- */
    // go to thank you page
    if (redirectToThankYou) return <Redirect to='/thank-you' />

    return (
        (!reviewer || !recipient) ? <Loading/> : 
        <div>
            <Header />
            {/* form area */}
            <div className='container'>
                <div className='container-menu'>
                    <Link className='container-menu__icon' to='/kitchen'>
                        <Icon path={ mdiArrowLeftCircle } title='Add' size={1} color='red'/>
                    </Link>
                    <div className='container-menu__text'>Cancel</div>
                </div>
                <h1 className='container-header'>Trip Completed!</h1>
                <h2 className='container-subheader'>Please rate { recipient.name }'s service</h2>
                <form className='review' onSubmit={ handleSubmit }>
                    <div className='review__driver-photo-containers'>
                        <img className='review__driver-photo' src={ profilePic } alt='driver' />
                    </div>
                    <div className='review__driver-rating'>
                        <div className='review__stars-container'>
                            <img className={`review__star ${ rating >= 1 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => applyRating(1) } />
                            <img className={`review__star ${ rating >= 2 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => applyRating(2) } />
                            <img className={`review__star ${ rating >= 3 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => applyRating(3) } />
                            <img className={`review__star ${ rating >= 4 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => applyRating(4) } />
                            <img className={`review__star ${ rating >= 5 ? 'review__star--filled' : ''}`} src={ iconStar } alt='rating' onClick={ () => applyRating(5) } />
                        </div>
                        <div className='review__stars-description'>{ rating === 0 ? 'How was the delivery?' : ratingDesc }</div>
                    </div>
                    <div className='review__input-group'>
                        <label className='review__invisible-label' htmlFor='reviewText'>Details</label>
                        <textarea 
                            className='review__input-field' 
                            rows='3' name='reviewText' id='reviewText' placeholder='Optional detailed review...' />
                    </div>
                    <button className={`review__button review__button--add ${ rating === 0 ? 'review__button--not-ready' : '' }`}  type='submit'>
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
 
export default ReviewPge;
