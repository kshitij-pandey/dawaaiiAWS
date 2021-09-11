import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

import { logoutUser } from "../../redux/actions/Auth.action";
import { reorderedCart } from "../../redux/actions/order.action";

import Navbar from "../layouts/Navbar.layout";
import HelpFindInventory from "../General/patch/HelpFindInventory.patch";
import HelpNumber from "../General/patch/HelpNumber.patch";
import Footer from "../layouts/Footer.layout";
import "../../styles/profilePage.css";
import LogoutConfModal from "../../components/modals/LogoutConfModal";
import OrderConfModal from "../../components/modals/OrderConfModal";
import { reservationsUrl } from "twilio/lib/jwt/taskrouter/util";
import { load } from "dotenv";
import { getUserDetails } from "../../redux/actions/Auth.action.js";
import { isAuthorized } from "../../utils/Auth";

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: window.innerWidth > 1000 ? "#f0f5f7" : "#fff",
        // backgroundColor: "#f0f5f7",
        // position: 'relative',
    },
}));

function Profile(props) {
    const [logoutModalShow, setLogoutModalShow] = useState(false);
    const [orderModalShow, setOrderModalShow] = useState(false);
    const [orderModalString, setOrderModalString] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");
    const [orders, setOrders] = useState(null);
 
    const history = useHistory();
    const url =
        window.location.host === "3.109.169.235"
            ? "http://localhost:8000"
            : "";

    let width = window.innerWidth;

  useEffect(()=>{
    const auth=isAuthorized()
    if(auth){
        const id = auth;
        console.log(id);
        setUserId(id);
        getMyOrders(id);
    }
  },[])
    const getMyOrders = async (id) => {
        const res = await fetch(`${url}/api/user/getOrders?id=${id}`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });

        if (res.status === 200) {
            const data = await res.json();
            setOrders(data.orders);
        }
        setLoading(false);
    };
    const classes = useStyle();

    const getMedicineString = (inx) => {
        if (orders[inx].products) {
            let products = orders[inx].products;
            let res = "";
            products.map((pro) => {
                // alert(pro.productQuantity);
                res += pro.productName + " x " + pro.productQuantity + ", ";
            });
            res = res.slice(0, -2);
            // alert(res)
            return res;
        }
    };

    const newOrderManipulateMethod = (order) => {
        if (order.status === "active") {
            setOrderModalString("Cancel");
            setSelectedOrder(order);
            setOrderModalShow(true);
        } else {
            orderManipulateMethod(order);
        }
    };

    const orderManipulateMethod = async (order) => {
        // alert(`order status is: ${order.status}`);
        if (order.status === "active") {
            // alert("we gonna cancel the order");
            const res = await fetch(`${url}/api/order/cancelOrder`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({ orderID: order.receipt }),
            });
            getMyOrders(userId);
            // window.location.reload();
        } else {
            // alert("we gonna re order this");
            console.log(order);
            let cart = [];
            order.products.map((pro) => {
                let product = {
                    storeId: pro.storeId,
                    storeName: pro.storeName,
                    city: order.city,
                    products: {
                        _id: pro._id,
                        productName: pro.productName,
                        productPrice: +pro.productPrice,
                        productDiscount: +pro.productDiscount,
                    },
                    id: pro._id,
                    itemCount: +pro.productQuantity,
                };
                cart.push(product);
            });

            props.reorderedCart(cart);
            history.push("/cart");

            // let product = {
            //     storeId,storeName,city,products,id,itemCount
            // }
        }
    };

    // const cancelOrder = async (orderID) => {
    //     alert("we in cancel Order method with" + orderID);
    //     // const res = await fetch(`${url}/api/order/cancelOrder`, {
    //     //     method: "POST",
    //     //     headers: new Headers({
    //     //         "Content-Type": "application/json",
    //     //     }),
    //     //     body: JSON.stringify(orderID),
    //     // });
    //     // window.location.reload();
    // };

    const getStoresString = (inx) => {
        if (orders[inx].products) {
            let storeTmp = [];
            let strs = orders[inx].products;
            let res = "";

            strs.map((s) => {
                if (!storeTmp.includes(s.storeName)) {
                    storeTmp.push(s.storeName);
                    res += s.storeName + ", ";
                }
            });
            res = res.slice(0, -2);
            return res;
        }
    };

    const getOrderTotal = (inx) => {
        if (orders[inx].products) {
            let products = orders[inx].products;
            let sum = 0;
            products.map((pro) => {
                sum += pro.productPrice * pro.productQuantity;
            });
            return sum;
        }
    };

    if (width > 600) {
        return (
            <>
                <LoadingOverlay
                    active={loading}
                    spinner
                    text="Loading your Profile..."
                >
                    <div className={classes.root}>
                        <Navbar showLogin={props.showLogin} />

                        <div className="profile-head-con">
                            <div className="head">
                                <div className="pers-details">
                                    <div className="name">
                                        {props.auth.user.userName}
                                    </div>
                                    {/* <div className="name">Kshitij Pandey</div> */}
                                    <div className="text">
                                        +91-{props.auth.user.phoneNo}
                                    </div>
                                    {/* <div className="text">+91-7678394361</div> */}
                                </div>
                                {/* <div className="logout-button">
                                    <button
                                        className="log-out"
                                        onClick={() => {
                                            setLogoutModalShow(true);
                                            // localStorage.removeItem(
                                            //     "Auth-token"
                                            // );
                                            // history.push("/");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div> */}
                            </div>
                            <div className="head">
                                <div className="pres-banner">
                                    <div className="text">
                                        My Medical Prescription
                                    </div>
                                    <div
                                        className="button"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            history.push("/myPrescription");
                                        }}
                                    >
                                        Find Now
                                    </div>
                                </div>
                            </div>
                        </div>

                        {orders && (
                            <div className="order-head-con">
                                {orders.map((order, inx) => (
                                    <div
                                        className={"order-con " + order.status}
                                    >
                                        <div className="left">
                                            <div className="text bold">
                                                {getMedicineString(inx)}
                                            </div>
                                            <div className="text">
                                                {getStoresString(inx)}
                                            </div>
                                            <div className="text">
                                                Order Id #{order.receipt} |{" "}
                                                {order.orderDate}
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="multiple">
                                                <button
                                                    onClick={() => {
                                                        newOrderManipulateMethod(
                                                            order
                                                        );
                                                        // orderManipulateMethod(
                                                        //     order
                                                        // );
                                                        // ------------------------
                                                        // order.status ===
                                                        // "active"
                                                        //     ? setOrderModalString(
                                                        //           "Cancel"
                                                        //       )
                                                        //     : setOrderModalString(
                                                        //           "Re-order"
                                                        //       );
                                                        // setSelectedOrder(order);
                                                        // setOrderModalShow(true);
                                                    }}
                                                    className={
                                                        "btn " +
                                                        (order.status ===
                                                        "active"
                                                            ? "cancel"
                                                            : order.status ===
                                                              "cancelled"
                                                            ? "re-order"
                                                            : "re-order-succ")
                                                    }
                                                >
                                                    {order.status === "active"
                                                        ? "Cancel"
                                                        : "Re-Order"}
                                                </button>
                                                <div className="text bold">
                                                    {order.statusString}
                                                </div>
                                            </div>
                                            <div className="text bold">
                                                Total Paid: ₹{" "}
                                                {getOrderTotal(inx)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <HelpFindInventory />
                        <HelpNumber />
                        <Footer />
                    </div>

                    <LogoutConfModal
                        show={logoutModalShow}
                        onHide={() => setLogoutModalShow(false)}
                        decisionaccept={() => {
                            // console.log("I ACCEPTED THE DECISION");
                            localStorage.removeItem("Auth-token");
                            props.logoutUser(); //*Clearing auth and cart state// keep it
                            console.log("check")
                            history.push("/");
                        }}
                        decisionreject={() => {
                            // console.log("I REJECTED THE DECISION");
                            setLogoutModalShow(false);
                        }}
                    />
                    <OrderConfModal
                        show={orderModalShow}
                        onHide={() => setOrderModalShow(false)}
                        string={orderModalString}
                        decisionaccept={() => {
                            console.log("I ACCEPTED THE DECISION");
                            // console.log(selectedOrder);
                            orderManipulateMethod(selectedOrder);
                            setOrderModalShow(false);
                        }}
                        decisionreject={() => {
                            console.log("I REJECTED THE DECISION");
                            setOrderModalShow(false);
                        }}
                    />
                </LoadingOverlay>
            </>
        );
    } else {
        return (
            <>
                <LoadingOverlay
                    active={loading}
                    spinner
                    text="Loading your Profile..."
                >
                    <div className={classes.root}>
                        <Navbar showLogin={props.showLogin} />
                        <div className="mobile-container">
                            <div className="mob-head-con">
                                <div className="mob-details">
                                    <div className="mob-pers">
                                        <div className="mob-name">
                                            Kshitij Pandey
                                        </div>
                                        <div className="mob-num">
                                            +91-7678394361
                                        </div>
                                    </div>
                                    <div className="mob-log">
                                        <button
                                            className="mob-btn-blue btn"
                                            onClick={() => {
                                                setLogoutModalShow(true);
                                                // localStorage.removeItem(
                                                //     "Auth-token"
                                                // );
                                                // history.push("/");
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                                <div className="mob-med">
                                    <div className="mob-med-text">
                                        My Medical Prescription
                                    </div>
                                    <div className="mob-findbtn">
                                        <button
                                            className="mob-btn-blue btn"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                history.push("/myPrescription");
                                            }}
                                        >
                                            Find Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mob-orders-con">
                            <div className="mob-head">PAST ORDERS</div>

                            {orders &&
                                orders.map((order, inx) => (
                                    <div className="mob-order">
                                        <div className="upper">
                                            <div className="left">
                                                <div className="med">
                                                    {getMedicineString(inx)}
                                                </div>
                                                <div
                                                    className={
                                                        "status-string " +
                                                        order.status
                                                    }
                                                >
                                                    {order.statusString}
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="price">
                                                    Rs. {getOrderTotal(inx)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lower">
                                            <div className="stores">
                                                {getStoresString(inx)}
                                            </div>
                                            <div className="meta">
                                                Order Id #{order.receipt} |{" "}
                                                {order.orderDate}
                                            </div>
                                            <div className="action-btn">
                                                <button
                                                    onClick={() => {
                                                        newOrderManipulateMethod(
                                                            order
                                                        );
                                                    }}
                                                    className={
                                                        "mob-btn " +
                                                        (order.status ===
                                                        "active"
                                                            ? "active"
                                                            : "re-order")
                                                    }
                                                >
                                                    {order.status === "active"
                                                        ? "CANCEL"
                                                        : "RE-ORDER"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <HelpFindInventory />
                        <HelpNumber />
                        <Footer />
                    </div>
                    <LogoutConfModal
                        show={logoutModalShow}
                        onHide={() => setLogoutModalShow(false)}
                        decisionaccept={() => {
                            // console.log("I ACCEPTED THE DECISION");
                            localStorage.removeItem("Auth-token");
                            props.logoutUser(); //*Clearing auth and cart state// keep it
                            history.push("/");
                        }}
                        decisionreject={() => {
                            // console.log("I REJECTED THE DECISION");
                            setLogoutModalShow(false);
                        }}
                    />
                    <OrderConfModal
                        show={orderModalShow}
                        onHide={() => setOrderModalShow(false)}
                        string={orderModalString}
                        decisionaccept={() => {
                            console.log("I ACCEPTED THE DECISION");
                            // console.log(selectedOrder);
                            orderManipulateMethod(selectedOrder);
                            setOrderModalShow(false);
                        }}
                        decisionreject={() => {
                            console.log("I REJECTED THE DECISION");
                            setOrderModalShow(false);
                        }}
                    />
                </LoadingOverlay>
            </>
        );

  
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    logoutUser,
    reorderedCart,
    getUserDetails,
})(Profile);
