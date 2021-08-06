import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PATHS } from '../../config'
import profileAction from '../../redux/actions/profileAction'
import { useEffect } from 'react'

const Profile = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.auth)

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(profileAction.getDetails());
        }
    },[isLoggedIn, dispatch]);

    const profile = useSelector(state => state.profile)

    if (!isLoggedIn) {
        return <Redirect to={PATHS.SIGNIN} />
    }

    return(
        <div className="container d-flex justify-content-center">
            <div className="card col-12 col-md-6">
                <div className="card-header">Profile</div>
                <div className="card-body d-flex flex-column">
                    <img className="col-6 col-md-3 align-self-center mb-2 rounded-circle" src={profile.src} alt={profile.name}></img>
                    <span className="card-title mb-1 px-3 fw-bold">Name</span>
                    <span className="card-text px-3 mb-2">{profile.name}</span>
                    <span className="card-title mb-1 px-3 fw-bold">Email</span>
                    <span className="card-text px-3">{profile.email}</span>
                </div>    
            </div>
        </div>
    )
}

export default Profile