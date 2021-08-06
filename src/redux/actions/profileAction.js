import { profileTypes } from "../actionTypes";
import { axios } from '../../config'

const profileAction = {
    getDetails: () => (dispatch) => {
        return axios({
            method: 'get',
            url: 'profile',
            headers: { 'Authorization' : 'bearer '+localStorage.getItem('_ut_')}
        })
        .then(res => {
            dispatch({type: profileTypes.get, payload: res.data})
        })
    },
    uploadJSONFile: (data, setMessage) => (dispatch) => {
        return axios({
            method: 'post',
            url: 'upload',
            headers: { 'Authorization' : 'bearer '+localStorage.getItem('_ut_')},
            data
        })
        .then(res => {
            dispatch({type: profileTypes.get, payload: res.data})
        })
        .catch(err => {
            setMessage(err.response.data.message)
        })
    },
    getFiles: () => (dispatch) => {
        return axios({
            method: 'get',
            url: 'files',
            headers: { 'Authorization' : 'bearer '+localStorage.getItem('_ut_')}
        })
        .then(res => {
            console.log(res)
            dispatch({type: profileTypes.get, payload: res.data})
        })
    }
}

export default profileAction 
