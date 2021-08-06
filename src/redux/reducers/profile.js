import { profileTypes } from "../actionTypes";

const initialData = {}

const profile = (state, action) => {
    state = state || initialData
    if (action.type === profileTypes.get) {
        return action.payload
    }
    else {
        return state
    }
}

export default profile