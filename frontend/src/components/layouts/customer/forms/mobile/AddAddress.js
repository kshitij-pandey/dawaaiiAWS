import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { addAddress } from "../../../../../redux/actions/order.action";
import { getPrefferedAddress } from "../../../../../redux/actions/Auth.action";
import AddAddressModal from "../../AddAddressModal";
import clsx from "clsx";
// import AddAddressModal from "../../AddAddress";

const AddAddress = (props) => {
    const classes = useStyle();
    const history = useHistory();

    const [openAddAddressModal, setOpenAddAddressModal] = React.useState(false);

    const [address, setAddress] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const submitAddress = () => {
        if (address !== "") {
            history.push("/cart");
        }
    };

    return (
        <>
            <div className={classes.root}>
                <div className={classes.topNav}>
                    <Link to="/cart">
                        <img
                            width="20px"
                            src="./assets/images/leftArrow.png"
                            alt=""
                        />
                    </Link>
                    <img src="./assets/images/Dawaai_logo.png" alt="" />
                </div>
                <div classes={classes.header}>
                    <div className={classes.title}>
                        <img width="35px" src="assets/images/Home.png" alt="" />
                        <div className={classes.text}>
                            <h5>Add Address</h5>
                            <p>Place Order</p>
                        </div>
                    </div>
                </div>
                {
                    props.auth.user.user_address && (
                        props.auth.user.user_address.map((address, i) => (
                            <div
                                className={clsx(classes.addresses, selectedIndex === i ? classes.selectedAddress : null)}
                                onClick={e => { setSelectedIndex(i); props.getPrefferedAddress(address.addressString) }}
                            >
                                <p>{address.addressString}</p>
                            </div>
                        ))
                    )
                }
                <div classes={classes.header}>

                </div>
                <hr />
                {/* <div className={classes.phone} >
                    <p>Enter Your Address</p>
                    <div className={classes.input} >
                        <textarea
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        ></textarea>
                    </div>
                </div> */}
                <div
                    className={classes.addAddresField}
                    onClick={(e) => setOpenAddAddressModal(true)}
                >
                    <h4>Add new Address</h4>
                </div>
                {/* <div className={classes.submit} onClick={submitAddress} > */}
                <div className={classes.submit}>
                    {/* <button onClick={e => props.addAddress(address)} >Add Address</button> */}
                    <Link to="/cart">
                        <button>Continue</button>
                    </Link>
                </div>
            </div>
            <AddAddressModal
                setOpenAddAddressModal={setOpenAddAddressModal}
                openAddAddressModal={openAddAddressModal}
            />
            {/* <AddAddressModal
                show={openAddAddressModal}
                setPrefferedAddress={(newAddress) => {
                    setAddress(newAddress);
                }}
                onHide={() => setOpenAddAddressModal(false)}
            /> */}
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    order: state.order,
});

export default connect(mapStateToProps, { addAddress, getPrefferedAddress })(AddAddress);

//styles
const useStyle = makeStyles((theme) => ({
    root: {
        zIndex: "10000 !important",
        background: "#fff",
        height: "500px",
    },
    topNav: {
        display: "flex",
        alignItems: "center",
        marginTop: ".5rem",
        marginLeft: "1rem",
        "& img": {
            margin: "0 .5em",
        },
    },
    title: {
        marginLeft: "1.5rem",
        display: "flex",
        alignItems: "center",
        "& img": {
            marginRight: "1rem",
        },
    },
    text: {
        marginTop: "1rem",
        // marginLeft: '4rem',
        marginBottom: "1rem",
        "& h5": {
            fontFamily: "gilroybold",
            fontSize: "22px",
            lineHeight: "30px",
        },
        "& p": {
            fontFamily: "gilroylight",
            fontSize: "18px",
            lineHeight: "30px",
        },
    },
    addresses: {
        margin: '0 1rem',
        '& p': {
            padding: '.2rem .5rem',
            fontFamily: "gilroylight",
            fontSize: "16px",
            lineHeight: "20px",
            color: '#8d8d8d',
            border: '1px solid #8d8d8d',
            borderRadius: '10px',
        },
    },
    selectedAddress: {
        '& p': {
            color: '#000',
            border: '1px solid #000',
        },
    },
    addAddresField: {
        margin: "auto",
        padding: "1rem",

        display: "table",
        border: "2px dashed #1785EB",
        borderRadius: ".7rem",
        cursor: "pointer",

        textAlign: "center",
        "& h4": {
            display: "table-cell",
            verticalAlign: "middle",
            fontFamily: "gilroybold",
            fontSize: "20px",
            lineHeight: "40px",
            color: "#1785EB",
        },
    },
    phone: {
        padding: "1rem",
        "& p": {
            fontFamily: "gilroymedium",
            fontSize: "18px",
            lineHeight: "30px",
        },
    },
    input: {
        height: "100px",
        display: "flex",
        alignItems: "center",
        marginTop: ".6rem",
        padding: ".5rem",
        border: "1px solid gray",
        borderRadius: "5px",
        "& input": {
            fontFamily: "gilroymedium",
            width: "100%",
            border: "none",
            margin: "0 .5rem",
            height: "1rem",
            outline: "none",
            fontSize: "20px",
        },
        "& textarea": {
            height: "100%",
            fontFamily: "gilroymedium",
            width: "100%",
            border: "none",
            margin: "0 .5rem",
            // height: '1rem',
            outline: "none",
            fontSize: "20px",
            color: "#B8B8B8",
        },
    },
    submit: {
        position: "fixed",
        bottom: "0",
        marginBottom: "0",
        width: "100%",
        "& button": {
            padding: "1rem",
            border: "none",
            color: "#fff",
            // borderRadius: '50px',
            background: "#74B9F9",
            width: "100%",
            fontFamily: "gilroymedium",
            fontSize: "20px",
            lineHeight: "30px",
        },
        "& label": {
            marginLeft: "1rem",
            fontFamily: "gilroymedium",
            fontSize: "15px",
            lineHeight: "30px",
            color: "#979797",
            "& input": {
                marginRight: ".5rem",
            },
        },
    },
}));
