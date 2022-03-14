// React modules
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
// app styles & assets
import './KitchenDashboard.scss'
import addRecord from '../../assets/Icons/add_item.svg'
// other sub components
import ModalDelete from '../ModalDelete/ModalDelete'
import ModalEditTrip from '../ModalEditTrip/ModalEditTrip'
import ModalCandidates from '../ModalCandidates/ModalCandidates'
import Loading from '../Loading/Loading';
// 3rd party libraries
import Icon from '@mdi/react'
import { mdiMapMarkerRadius, mdiHomeAccount, 
    mdiCalendarClock, mdiCurrencyUsd, mdiCarHatchback } from '@mdi/js'
// redux
import { useSelector, useDispatch } from 'react-redux';
import { 
    loadTripsByUser, 
    loadTripsWithCandidates, 
    deleteTrip,
    finishTrip 
} from '../../store/slices/trips';
import { fetchCandidatesForTrip, acceptDriver } from '../../store/slices/candidates';

const KitchenDashboard = () => {

    /* -------------------------------------------------------------------------
    redux setup
    ------------------------------------------------------------------------- */
    // returns the dispatch function of the redux store
    const dispatch = useDispatch();

    // subscribe to slices of the store we're interested in
    let user = JSON.parse(sessionStorage.getItem('user'));

    const trips = useSelector(state => state.entities.trips.list);
    const tripsWithCandidates = useSelector(state => state.entities.trips.listWithCandidates);
    const modalCandidates = useSelector(state => state.entities.candidates.modalCandidates);
    const lastEditTrips = useSelector(state => state.entities.trips.lastEdit);
    const lastEditCandidates = useSelector(state => state.entities.candidates.lastEdit);

    // local states
    const [modalTrip, setModalTrip] = useState({});
    const [showModalDelete, setModalDelete] = useState(false);
    const [showModalCandidates, setModalCandidates] = useState(false);
    const [showModalEditTrip, setModalEditTrip] = useState(false);
    const [directToReviewPage, setDirectToReviewPage] = useState(false);
    const [driverToReview, setDriverToReview] = useState(null);

    // fetch trips by user on page load
    useEffect(() => {
        dispatch(loadTripsByUser(user.id));
        dispatch(loadTripsWithCandidates(user.id));
    }, [lastEditTrips, lastEditCandidates])

    /* -------------------------------------------------------------------------
    modals control
    ------------------------------------------------------------------------- */
    const showModal = (trip, modal) => {
        setModalTrip(trip);
        if (modal === 'delete') setModalDelete(true);
        if (modal === 'candidates') setModalCandidates(true);
        if (modal === 'edit') setModalEditTrip(true);
    }

    const hideModal = () => {
        setModalDelete(false);
        setModalCandidates(false);
        setModalEditTrip(false);
    };

    /* -------------------------------------------------------------------------
    API related
    ------------------------------------------------------------------------- */
    const handleDeleteTrip = () => {
        dispatch(deleteTrip(modalTrip.id));
        hideModal();
    }

    const updateAcceptedDriver = (driverID) => {
        dispatch(acceptDriver(driverID, modalTrip.id));
        // close the modal
        hideModal();
    };

    const loadCandidates = (trip) => {
        dispatch(fetchCandidatesForTrip(trip.id));
        showModal(trip, 'candidates');
    }

    const completeTrip = (trip) => {
        // update trip status
        dispatch(finishTrip(trip.id));
        // redirect to review page
        setDirectToReviewPage(true);
        setModalTrip(trip);
        setDriverToReview(trip.driver_id);
    }

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */
    // go to review page
    if (directToReviewPage && driverToReview) {
        return (
            <Redirect to={`/${modalTrip.id}/${driverToReview}/review`} />
        )
    };

    return (
        trips.length === 0 ? 
            // UI for when there's no trip to display
            <div className='no-trips'>
                <img className='no-trips__img' src={ addRecord } alt='Add record' />
                <p className='no-trips__content'>You don't have any active trips. Click the button above to create one</p>
            </div>
                : 
        (<div>
            {/* Modals */}
            <ModalCandidates 
                key={ Math.floor(Math.random()* 999 + 1) }
                show={ showModalCandidates } 
                handleClose={ hideModal } 
                candidates={ modalCandidates }
                updateAcceptedDriver={ updateAcceptedDriver } />
            <ModalDelete 
                show={ showModalDelete } 
                handleClose={ hideModal } 
                data={ modalTrip } 
                deleteFunction={ handleDeleteTrip } />
            <ModalEditTrip 
                show={ showModalEditTrip } 
                handleClose={ hideModal }
                modalTrip={ modalTrip } />
            
            {/* table area - header */}
            { trips.map(trip => (
                <div key={ trip.id } className='trip'>
                    <div className='trip-details'>
                        <div className='trip-details__row'>
                            <div className='trip-details__label'>
                                <Icon path={ mdiHomeAccount } title='Origin' size={1} color='SlateGray'/>
                            </div>
                            <div className='trip-details__content'>{ trip.origin }</div>
                        </div>
                        <div className='trip-details__row'>
                            <div className='trip-details__label'>
                                    <Icon path={ mdiMapMarkerRadius } title='Destination' size={1} color='SlateGray'/>
                            </div>
                            <div className='trip-details__content'>{ trip.destination }</div>
                        </div>
                        <div className='trip-details__row'>
                            <div className='trip-details__label'>
                                <Icon path={ mdiCalendarClock } title='Date' size={1} color='SlateGray'/>
                            </div>
                            <div className='trip-details__content'>{ trip.formatted_date }</div>
                        </div>
                        <div className='trip-details__row'>
                            <div className='trip-details__label'>
                                <Icon path={ mdiCurrencyUsd } title='Pay' size={1} color='SlateGray'/>
                            </div>
                            <div className='trip-details__content'>${ trip.payment_amount } (paid by { trip.payment_type })</div>
                        </div>
                        
                        <div className='trip-details__row trip-details__row--driver'>
                            <div className='trip-details__label'>
                                <Icon path={ mdiCarHatchback } title='Driver' size={1} color='SlateGray'/>
                            </div>
                            <div className='trip-details__content'>
                                {!tripsWithCandidates ? <p>CHECKING...</p> : 
                                tripsWithCandidates.indexOf(trip.id) > -1 ? 
                                    <button className='trip-details__status trip-details__status--select-driver' onClick={ () => loadCandidates(trip) }>Driver found - Click to accept</button> : 
                                    <div className='trip-details__status-container'>
                                        { trip.driver_id ? 
                                        <div>
                                            <div className='trip-details__status-text'>Being delivered by driver <span className='trip-details__bold'
                                            >No. {trip.driver_id}</span></div>
                                            <div><button className='trip-details__status trip-details__status--mark-complete' onClick={ () => { completeTrip(trip)}}>Mark completed</button></div>
                                        </div> : 
                                        <div><button className='trip-details__status trip-details__status--pending'>Driver Pending</button></div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='trip-buttons__group'>
                        <button className='trip-buttons trip-buttons--edit' onClick={ () => showModal(trip, 'edit')}>EDIT</button>
                        <button className='trip-buttons trip-buttons--delete' onClick={ () => showModal(trip, 'delete')}>DELETE</button>
                    </div>
                </div>
            ))}
        </div>)
    )
}
 
export default KitchenDashboard;
