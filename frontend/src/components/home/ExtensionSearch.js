import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
import { getProductSeachResult } from "../../redux/actions/product.action";

import Navbar from "../layouts/Navbar.layout";
import "../../styles/prescription.css";
import HelpFindInventory from "../General/patch/HelpFindInventory.patch";
import HelpNumber from "../General/patch/HelpNumber.patch";
import Footer from "../layouts/Footer.layout";
import ScrollToTopOM from "../ScrollToTopOM";

const useStyle = makeStyles(() => ({
    root: {
        background: "#fff",
        // position: 'relative',
    },
}));

function ExtensionSearch(props) {
    // const location = useHistory();
    const location = useLocation();
    const history = useHistory();
    // const { location: { state: { details } } = useHistory();
    const classes = useStyle();

    // const [prescription, setPrescription] = useState(null);

    useEffect(() => {
        console.log(location.search);
        // console.log("we loaded?");
        window.scrollTo(0, 0);
        // setPrescription(location.state.detail);
        // console.log(location.state.detail);
        console.log(location.push);
        const name = new URLSearchParams(location.search).get('name');
        console.log(name);
        // const medicineName = name;
        // alert(`Searching with ${name}`);
        const loc = "Varanasi";
        props.getProductSeachResult(name, loc);
        history.push("/searchResult");
    });

    // const findMedicine = (name) => {
    //     const medicineName = name;
    //     // alert(`Searching with ${name}`);
    //     const loc = "Varanasi";
    //     props.getProductSeachResult(medicineName, loc);
    //     history.push("/searchResult");
    // };

    return (
        <>
            <h1>Redirecting...</h1>
        </>
    );
}

const mapStateToProps = (state) => ({
    product: state.product,
    location: state.location,
});

export default connect(mapStateToProps, { getProductSeachResult })(
    ExtensionSearch
);
