// app styles & assets
import './LogoutButton.scss'

const LogoutButton = (props) => {

    const handleLogout = () => {
        // remove session storage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        // also run additional functionalities from parent
        props.handleLogout();
    }
    return (
        <button className='logout-button' onClick={ handleLogout }>
            Log out
        </button>
    );
}
 
export default LogoutButton;
