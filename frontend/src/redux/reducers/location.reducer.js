import { GET_LOCATION, LOCATION_LOADING, SET_LOCATION_SUGGESTIONS, SET_MAP_COORDS, SET_SELECTED_LOCATION,SET_STORES_CLUSTER,SET_STORES_CITY } from "../types.redux"


const initialState = {
    loading: false,
    locations: [],
    selectedLocation: null,
    my_coords: null,
    storesInCluster:[],
    storesInCity:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_LOCATION_SUGGESTIONS:
            return {
                ...state,
                locations: action.payload,
                loading: false
            }
        case SET_SELECTED_LOCATION:
            return {
                ...state,
                selectedLocation: action.payload,
                loading: false
            }
        case SET_MAP_COORDS:
            return {
                ...state,
                my_coords: action.payload,
                loading: false
            }
        case SET_STORES_CLUSTER:
            return {
              ...state,
              storesInCluster:action.payload,
              loading: false  
            }
            case SET_STORES_CITY:
                return {
                  ...state,
                  storesInCity:action.payload,
                  loading: false  
                }

        default:
            return state;
    }
}