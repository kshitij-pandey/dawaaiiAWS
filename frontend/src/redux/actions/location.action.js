import axios from "axios";
import {
    SET_LOCATION_SUGGESTIONS,
    LOCATION_LOADING,
    SET_SELECTED_LOCATION,
    SET_NUMBER,
    SET_MAP_COORDS,
    SET_STORES_CLUSTER,
    SET_STORES_CITY
} from "../types.redux";

const url =
    window.location.host === "3.109.169.235" ? "http://localhost:8000" : "";

/**
 * @param {*} data string for searching
 * returns all sggestions using google API
 */
export const getLocations = (data) => (dispatch) => {


    axios.post(`${url}/location/locationSuggestions`, data).then((ress) => {
        dispatch({
            type: SET_LOCATION_SUGGESTIONS,
            payload: ress.data,
        });
    });
   
};

export const getGPSLocation = (lat, lon) => async (dispatch) => {
    let coords = { lat, lon };
    // let coords = {
    //     lat: 25.310580462879805,
    //     lon: 82.97892498027342
    // }
    console.log(coords);
    axios.post(`${url}/location/getLocationFromCordinates`, coords).then((ress) => {
        // console.log(ress);
        dispatch({ type: LOCATION_LOADING });
        dispatch({ type: SET_SELECTED_LOCATION, payload: ress.data });
    });
};

export const setSelectedLocation = (location) => (dispatch) => {
    dispatch({ type: LOCATION_LOADING });
    dispatch({ type: SET_SELECTED_LOCATION, payload: location });
};

export const setMapCoords = location_name => dispatch => {
    let locName = { location_name }
    console.log(locName);
    // dispatch({ type: LOCATION_LOADING });
    axios.post(`${url}/api/search/get_coords`, locName).then((ress) => {
        dispatch({
            type: SET_MAP_COORDS,
            payload: ress.data
        })
    })

}

//we removed getPhone Number From Here 

export const getAllStoresInCluster= (loc)=> async (dispatch)=>{
    const obj={location_name: loc};
    const coords= await axios.post(`${url}/location/get_coords`, obj);
   
   const city= await axios.post(`${url}/location/getLocationFromCordinates`, coords.data);
   const strs=await axios.post(`${url}/cluster/clusterSearch`,{coords:coords.data,city:city.data.name}).then((ress) => {
        dispatch({
            type: SET_STORES_CLUSTER,
            payload: ress.data,
        });
    });
};

export const getAllStoresInCity= location => async dispatch => {
    const obj={location_name: location}
    const coords= await axios.post(`${url}/location/get_coords`, obj);
   const city= await axios.post(`${url}/location/getLocationFromCordinates`, coords.data);
    axios.post(`${url}/location/storesInCity`,{city: city.data.name}).then((ress) => {
        dispatch({
            type: SET_STORES_CITY,
            payload: ress.data,
        });
    });
};