// React modules
import { Link } from 'react-router-dom';
// app styles & assets
import './ThankYouPage.scss'
import thanksPhoto from '../../assets/Icons/thanks.svg'
// other sub components
import Header from '../../components/Header/Header'

const ThankYouPage = () => {
    return (
        <div>
            <Header />
            <div className='thanks-note'>
                <img src={ thanksPhoto } className='thanks-note__img' alt='Rider'/>
                <div className='thanks-note__message'>Thanks for using Food Bunnies!</div>
                <Link to={'/kitchen'}>
                    <button className='thanks-note__button'>CLOSE</button>
                </Link>
            </div>
        </div>
    );
}
 
export default ThankYouPage;
