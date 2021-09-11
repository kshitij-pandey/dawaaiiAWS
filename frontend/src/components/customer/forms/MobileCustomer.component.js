import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { addNumber } from "../../../../redux/actions/order.action";

const MobileCustomer = (props) => {
    const classes = useStyle();

    let token = localStorage.getItem("Auth-token");

    const { number, address, cart } = props.order;
    const { isAuthenticated } = props.auth;

    let totalPrice = 0;
    cart.map((product) => {
        totalPrice += +product.productPrice * product.itemCount;
    });

    useEffect(() => {
        if (token) {
            props.addNumber(props.auth.user.phoneNo);
        }
    }, [props.auth.phoneNo]);

    //Login popup from below button
    function showModal(e) {
        e.preventDefault();
        props.showLogin();
    }

    return (
        <>
            <div className={classes.root}>
                {number === null || !token ? (
                    <div className={classes.address}>
                        <div classes={classes.left}>
                            <div className={classes.text}>
                                {/* <h1>Sign in to place your order</h1> */}
                                <h1>Login</h1>
                                <p>Please login</p>
                            </div>
                        </div>
                        <div className={classes.button}>
                            <Link to="/addnumber">
                                <button onClick={(e) => showModal(e)}>
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : null}

                {number !== null && address === null && token ? (
                    <div className={classes.address}>
                        <div classes={classes.left}>
                            <div className={classes.text}>
                                <h1>Add address to proceed</h1>
                                <p>Please add delivery address</p>
                            </div>
                        </div>
                        <div className={classes.button}>
                            <Link to="/addaddress">
                                <button>Add</button>
                            </Link>
                        </div>
                    </div>
                ) : null}

                {number !== null && address !== null && token ? (
                    <>
                        <div className={classes.address}>
                            <div classes={classes.left}>
                                <div className={classes.text}>
                                    <h1>Deliver to:</h1>
                                    {/* <p>{address}</p> */}
                                    {/* <p>{props.auth.user.user_address[0].addressString}</p> */}
                                    <p>{props.auth.preferedAddres}</p>
                                    {/* <p>{props.auth.user.user_address[0].addressString}</p> */}
                                    {/* //need to discuss with Mayur */}
                                </div>
                            </div>
                            <div className={classes.button}>
                                <Link to="/addaddress">
                                    {/* <button>Add</button> */}
                                    Change
                                </Link>
                            </div>
                        </div>
                        <hr style={{ margin: ".5rem 0" }} />
                        <div className={classes.address}>
                            {/* <div classes={classes.left} >
                                <div className={classes.text} >
                                    <h1>Order here</h1>
                                    <p>Click to order</p>
                                </div>
                            </div> */}
                            <div className={classes.orderButton}>
                                {/* <Link to="/addaddress" > */}
                                <button
                                    onClick={(e) => {
                                        props.placeOrder(e);
                                    }}
                                >
                                    Pay <strong>&#x20B9;</strong> {totalPrice}
                                </button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    order: state.order,
});

export default connect(mapStateToProps, { addNumber })(MobileCustomer);

const useStyle = makeStyles((theme) => ({
    root: {
        background: "#fff",
        padding: ".8rem 1rem",
        boxShadow: "-1px -3px 9px -1px rgba(0,0,0,0.75)",
        WebkitBoxShadow: "-1px -3px 9px -1px rgba(0,0,0,0.75)",
        MozBoxShadow: "--1px -3px 9px -1px rgba(0,0,0,0.75)",
        zIndex: "10000",
    },
    address: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& h1": {
            margin: "0px",
            fontFamily: "gilroybold",
            fontSize: "18px",
            lineHeight: "30px",
        },
        "& p": {
            margin: "0px",
            fontFamily: "gilroyregular",
            fontSize: "15px",
            lineHeight: "20px",
        },
    },
    button: {
        "& button": {
            padding: ".5rem 1.5rem",
            background: "#F36D31",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",

            fontFamily: "gilroybold",
        },
        "& a": {
            margin: "0px",
            textDecoration: "none",
            fontFamily: "gilroyregular",
            fontSize: "18px",
            color: "#F36D31",
            lineHeight: "20px",
        },
    },
    orderButton: {
        width: "100%",
        "& button": {
            width: "100%",
            padding: ".7rem",
            border: "none",
            borderRadius: "50px",
            background: "#F36D31",

            fontFamily: "gilroyregular",
            fontSize: "20px",
            color: "#fff",
            lineHeight: "20px",
        },
    },
}));
