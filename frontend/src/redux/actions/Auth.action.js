import axios from "axios"
import { DE_AUTH, SET_AUTH, SET_PREFERED_ADDRESS } from "../types.redux"
const url="http://localhost:8000"


export const getUserDetails = (token) => (dispatch) => {
    let tok = token
    token="bearer "+tok;
    axios.post(`${url}/user/userDetails`, {token:token}).then(ress => {
        console.log("ress is" ,ress);
        dispatch({
            type: SET_AUTH,
            payload: ress.data.user1
        })
    }).catch(err=>{
        console.log("the error is ",err.message)
    });
}

export const getPrefferedAddress = (address) => dispatch => {
    dispatch({
        type: SET_PREFERED_ADDRESS,
        payload: address
    })
}

export const addAddressString = (data, token) => dispatch => {

}

export const logoutUser = () => dispatch => {
    dispatch({
        type: DE_AUTH
    })
}