import {
    ADD_TO_CART,
    CLEAR_CART,
    DECREASE_QUANTITY,
    GET_LOCATION,
    INCREASE_QUANTITY,
    PRODUCT_LOADING,
    REMOVE_FROM_CART,
    REORDERED_CART,
    SET_ADDRESS,
    SET_NUMBER,
    SET_ORDER_SUCCESS,
    SET_PERSON,
    SET_PRODUCTS,
    SET_SUCCESS_INVOICE,
} from "../types.redux";

const initialState = {
    cart: [],
    number: null,
    address: null,
    person: null,
    successInvoice: [],
    orderSuccess: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NUMBER:
            return {
                ...state,
                number: action.payload,
            };
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload,
            };
        case SET_PERSON:
            return {
                ...state,
                person: action.payload,
            };
        case ADD_TO_CART:
            let product_existed = state.cart.map((el) => {
                return el.productID;
            });
            let existed = product_existed.includes(action.payload.productID);

            let product_existed_new = state.cart.map((el) => {
                return el.productName;
            });
            let same_name_exists = product_existed_new.includes(
                action.payload.productName
            );

            if (!existed) {
                if (!same_name_exists) {
                    return {
                        ...state,
                        cart: [...state.cart, action.payload],
                    };
                } else {
                    //remove old product and add the new incoming one...
                    let newCartArray = state.cart.filter(
                        (el) =>
                            el.productName !==
                            action.payload.productName
                    );

                    newCartArray.push(action.payload);
                    return {
                        ...state,
                        cart: newCartArray,
                    };
                }
            } else {
                return {
                    ...state,
                };
            }

        case REORDERED_CART:
            return {
                ...state,
                cart: action.payload,
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(
                    (el) => el.productID !== action.payload
                ),
            };

        case INCREASE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((el) =>
                    el.productID === action.payload.productID
                        ? { ...el, itemCount: el.itemCount + 1 }
                        : el
                ),
                // loading: false
            };

        case DECREASE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((el) =>
                    el.productID === action.payload.productID
                        ? el.itemCount > 0
                            ? { ...el, itemCount: el.itemCount - 1 }
                            : el
                        : el
                ),
                // loading: false
            };
        case SET_ORDER_SUCCESS:
            return {
                ...state,
                orderSuccess: action.payload,
            };

        case SET_SUCCESS_INVOICE:
            return {
                ...state,
                successInvoice: state.cart,
            };

        case CLEAR_CART:
            return {
                ...state,
                cart: [],
            };

        default:
            return state;
    }
};
