import axios from "axios";
import {
    ADD_TO_CART,
    CLEAR_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
    ORDER_LOADING,
    REMOVE_FROM_CART,
    REORDERED_CART,
    SET_ADDRESS,
    SET_NUMBER,
    SET_ORDER_SUCCESS,
    SET_PERSON,
    SET_SUCCESS_INVOICE,
} from "../types.redux";
const url="http://localhost:8000"
/**
 *
 * @param {*} data object of user and cart details {number, address, products[]}
 */
export const submitOrder = (data) => (dispatch) => {

    axios
        .post(`${url}/order/neworder`, data)
        .then((ress) => {
            dispatch({
                type: SET_SUCCESS_INVOICE,
            });
            dispatch({
                type: SET_ORDER_SUCCESS,
                payload: ress.data.success,
            });
            dispatch({
                type: CLEAR_CART,
            });
        })
        .catch((e) => {
            console.log(e);
        });
};

/**
 *
 * @param {*} number user phone number
 */
export const addNumber = (number) => (dispatch) => {
    dispatch({
        type: SET_NUMBER,
        payload: number,
    });
};

/**
 *
 * @param {*} address user adress
 */
export const addAddress = (address, token) => async (dispatch) => {

    let addresses = { addressString: address }
    let tok=localStorage.getItem("Auth-token");
    const res = await fetch(`/user/updateAddress`, {
        method: "POST",
        headers: {
            Authorization: "bearer "+tok,
            "Content-type": "Application/json",
        },
        body: JSON.stringify(addresses),
    });
    const data = await res.json();
    console.log("updateAdress",data);
    dispatch({
        type: SET_ADDRESS,
        payload: address,
    });

};

export const storeAddress = (address, phoneNo) => dispatch => {
    // console.log(address, phoneNo);
    let data = { address, phoneNo }
    axios.post("/api/user/add_address", data).then(ress => {
        // console.log(ress);
    })
}


export const addPerson = (person) => (dispatch) => {
    dispatch({
        type: SET_PERSON,
        payload: person,
    });
};



/**
 *
 * @param {*} product adding product to cart
 */
export const addProductToCart = (product) => (dispatch) => {
    console.log("product is",product);
    dispatch({ type: ORDER_LOADING });
    dispatch({
        type: ADD_TO_CART,
        payload: product,
    });
};

export const reorderedCart = (cartState) => (dispatch) => {
    dispatch({
        type: REORDERED_CART,
        payload: cartState,
    });
};

export const removeFromCart = (id) => (dispatch) => {
    // dispatch({ type: ORDER_LOADING });
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });
};

/**
 *
 * @param {*} id increase item count in cart
 */
export const increaseProductCount = (id) => (dispatch) => {
    dispatch({
        type: INCREASE_QUANTITY,
        payload: { productID: id, itemCount: 1 },
    });
};

/**
 *
 * @param {*} id decrease item count in cart
 */
export const decreaseProductCount = (id) => (dispatch) => {
    dispatch({
        type: DECREASE_QUANTITY,
        payload: { productID: id, itemCount: -1 },
    });
};
