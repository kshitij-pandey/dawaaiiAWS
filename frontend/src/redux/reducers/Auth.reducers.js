import { DE_AUTH, GET_LOCATION, LOCATION_LOADING, SET_AUTH, SET_LOCATION, SET_PREFERED_ADDRESS, SET_SELECTED_LOCATION } from "../types.redux"


const initialState = {
    isAuthenticated: false,
    user: [],
    preferedAddres: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                // preferedAddres: action.payload.user_address[0].addressString, //Needs change
                loading: false
            }
        case DE_AUTH:
            return {
                ...state,
                isAuthenticated: false,
                user: [],
            }

        case SET_PREFERED_ADDRESS:
            return {
                ...state,
                preferedAddres: action.payload,
                loading: false
            }

        default:
            return state;
    }
}