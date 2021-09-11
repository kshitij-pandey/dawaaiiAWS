import { ADD_TO_CART, CLEAR_MEDICINE_PACKAGES, GET_LOCATION, PRODUCT_LOADING, REMOVE_SEARCHING_MED_LIST, SET_CLUSTER_SEARCH, SET_FOUNDED_SEARCH_MED_LIST, SET_MEDICINE_PACKAGES, SET_PRODUCTS, SET_SEARCHING_MED_LIST, SET_SEARCH_RESULT } from "../types.redux"


const initialState = {
    loading: false,
    searchResult: [],
    products: [],
    availableProducts:[],
    cart: [],
    searchingList: [],
    foundedMedicineSearch: [],
    clusterSearchRes: [],
    medicinePackages:[],   
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case SET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.payload,
                loading: false
            }
        case SET_SEARCHING_MED_LIST:
            return {
                ...state,
                searchingList: [...state.searchingList, action.payload],
                loading: false
            }
        case SET_FOUNDED_SEARCH_MED_LIST:
            return {
                ...state,
                foundedMedicineSearch:  action.payload,
                loading: false
            }
        case REMOVE_SEARCHING_MED_LIST:
            return {
                ...state,
                searchingList: state.searchingList.filter(el => el !== action.payload),
                loading: false
            }


        case SET_CLUSTER_SEARCH:
            return {
                ...state,
                clusterSearchRes: action.payload,
                loading: false
            }

        case SET_MEDICINE_PACKAGES:
            return {
                ...state,
                medicinePackages: action.payload
            }

        case CLEAR_MEDICINE_PACKAGES:
            return {
                ...state,
                medicinePackages: [],
                clusterSearchRes: []
            }

        default:
            return state;
    }
}