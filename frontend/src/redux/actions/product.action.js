import axios from "axios";
import {
    ADD_TO_CART,
    PRODUCT_LOADING,
    REMOVE_SEARCHING_MED_LIST,
    SET_PRODUCTS,
    SET_SEARCHING_MED_LIST,
    SET_SEARCH_RESULT,
    SET_CLUSTER_SEARCH,
    SET_MEDICINE_PACKAGES,
    CLEAR_MEDICINE_PACKAGES,
    SET_FOUNDED_SEARCH_MED_LIST,
} from "../types.redux";

/**
 * gets all searched products fro Products Database
 *when searched you will get all details of that product 
 * @param {*} data string for searching product
 */
/* 
products ={
    availableInCluster:[],
    unavailabeInCluster:[]
}


*/

export const getProducts = (term) => (dispatch) => {
    console.log("getProductsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",term);
    dispatch({ type: PRODUCT_LOADING });

    axios.post(`http://localhost:8000/product/searchProduct?query=${term}`).then((ress) => {
        console.log(ress)
        dispatch({
            type: SET_PRODUCTS,
            payload: ress.data,
        });
    }); 

    // axios.post("http://localhost:8000/product/getAllProducts", data).then((ress) => {
    //     console.log("backend is working like",ress.data)
    //      dispatch({
    //         type: SET_PRODUCTS,
    //         payload: ress.data,
    //     });
    // });
};


/**
 *
 * @param {*} product full string of product name to be search
 * @param {*} locations array of locations to be search in
 */
// export const getProductSearchResult = (term) => (dispatch) => {
    
//     console.log("getProductSearchList",term);
//     dispatch({ type: PRODUCT_LOADING });
   
//     axios.post(`http://localhost:8000/product/searchProduct?query=${term}`).then((ress) => {
//         console.log(ress)
//         dispatch({
//             type: SET_SEARCH_RESULT,
//             payload: ress.data,
//         });
//     });
// };

export const addSearchMed = (medName) => (dispatch) => {
    
    dispatch({
        type: SET_SEARCHING_MED_LIST,
        payload: medName,
    });
};

export const foundedSearchMedList = medName => dispatch => {
    dispatch({
        type: SET_FOUNDED_SEARCH_MED_LIST,
        payload: medName
    })
}

export const removeSearchMed = (medName) => (dispatch) => {
    console.log("remove",medName);
    dispatch({
        type: REMOVE_SEARCHING_MED_LIST,
        payload: medName,
    });
};

export const clusterSearch = (medSearchArr, user_loc_name) => (dispatch) => {
    console.log(medSearchArr);
    console.log(user_loc_name);
    let data = {
        medicineArray: medSearchArr,
        user_loc: user_loc_name,
    };
    axios
        .post("/api/search/clusterSearch", data)
        .then((ress) => {
            console.log(ress);
            // let ressData = ress.data
            dispatch({
                type: SET_CLUSTER_SEARCH,
                payload: ress.data,
            });
        })
        .catch((e) => {
            dispatch({
                type: SET_CLUSTER_SEARCH,
                payload: [],
            });
        });
};

export const clearMedicinePackage = () => (dispatch) => {
    dispatch({
        type: CLEAR_MEDICINE_PACKAGES,
        payload: [],
    });
};

export const setMedicinePackages = (packages) => (dispatch) => {
    console.log("setmedicine packages called ",packages)
    dispatch({
        type: SET_MEDICINE_PACKAGES,
        payload: packages,
    });
};
