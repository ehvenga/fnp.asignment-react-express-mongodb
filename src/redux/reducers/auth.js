import { authTypes } from "../actionTypes";

const auth = (state, action) => {
    state = state | !!localStorage.getItem('_ia_') // isAuth token

    switch (action.type) {
        case authTypes.login:
            localStorage.setItem('_ia_', true)
            return true
        
        case authTypes.logout:
            localStorage.removeItem('_ia_')
            localStorage.removeItem('_ut_')
            return false
    
        default:
            return state;
    }
}

export default auth

