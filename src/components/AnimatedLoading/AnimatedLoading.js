import './AnimatedLoading.scss';

// Credit: https://dribbble.com/shots/5092176-Newton-Loader
const AnimatedLoading = () => {
    return (
        <div className='gooey'>
            <span className='dot'></span>
            <div className='dots'>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='loading-text'>Just a moment...</div>
        </div>
    );
}
 
export default AnimatedLoading;