import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import authAction from '../../redux/actions/authAction';

const Navbar = () => {

    const isLoggedIn = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logoutUser = (e) => {
        e.preventDefault()
        dispatch(authAction.logout())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 px-5">
            <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse justify-content-md-between " id="navbarToggler">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link' to={PATHS.HOME}>Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {
                            !isLoggedIn ? 
                            <>
                                <li className="nav-item">
                                    <Link className='nav-link' to={PATHS.SIGNIN}>Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to={PATHS.SIGNUP}>Signup</Link>
                                </li> 
                            </>
                            :
                            <>  
                                <li className="nav-item">
                                    <Link className='nav-link' to={PATHS.UPLOAD}>Upload</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to={PATHS.PROFILE}>Profile</Link>
                                </li>
                                <li>
                                    <Link className='nav-link' onClick={logoutUser} to={PATHS.LOGOUT}>Logout</Link>
                                </li>
                            </>

                        }
                    </ul>
                </div>
            </div>
        </nav> 
    )
}

export default Navbar;