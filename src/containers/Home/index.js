import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import profileAction from '../../redux/actions/profileAction'

const Home = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.auth)
    const [ showData, setShowData ] = useState([])

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(profileAction.getFiles());
        }
    },[isLoggedIn, dispatch])

    const profile = useSelector(state => state.profile)
    const files = profile.files

    const handleClick = (e) => {
        const dataVisible = showData.some(item=> item === e.target.id)
        if(!dataVisible) {
            const updateShowData = showData.concat(e.target.id)
            setShowData(updateShowData)
        }
        else {
            const updateShowData = showData.filter(item => item !== e.target.id)
            setShowData(updateShowData)
        }
    }

    return(
        <>
            {
                !isLoggedIn ?
                <div className="container alert alert-warning" role="alert">
                    Login to View Data
                </div> : 
                !files ? 
                <div className="container">
                    <div className="spinner-border text-primary" role="status"></div>
                    <span className="mx-2">Loading...</span>
                </div> : 
                files.length === 0 ? 
                <div className="container alert alert-info" role="alert">
                    No Items Uploaded
                </div> :
                <div className="container d-flex flex-column align-items-center">
                    {   
                        files.map((item, idx) => {
                            return(
                                <div className="card col-10 col-md-8 mb-3" key={idx}>
                                    <div className="card-header fw-bold">
                                        <span>File Name: {item.name}</span>
                                        <span className="ms-4">Date Uploaded: {item.createdAt.split("T").join(" Time: ").split(".").slice(0,1)}</span>
                                    </div>
                                    { 
                                        showData.some(item => parseInt(item) === idx) ?
                                        <div className="card-body">
                                            <div className="d-flex justify-content-center">
                                                <button className="btn mb-2" id={idx} onClick={handleClick}>Hide Data</button>
                                            </div>
                                            {item.data.map((item, idx) => {
                                                return(
                                                    <div className="card mb-2" key={idx}>
                                                        <div className="card-body card-body-data">
                                                            <div>userId: {item.userId}</div>
                                                            <div>id: {item.id}</div>
                                                            <div>title: {item.title}</div>
                                                            <div>body: {item.body}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <div className="d-flex justify-content-center">
                                                <button className="btn mb-2" id={idx} onClick={handleClick}>Hide Data</button>
                                            </div>
                                        </div> :
                                        <div className="card-body d-flex justify-content-center">
                                            <button className="btn" id={idx} onClick={handleClick}>Show Data</button>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

export default Home