import { makeStyles } from "@material-ui/core";

import clsx from "clsx";
import React from "react";

function HelpFindInventory() {
    const classes = useStyle();
    let pathname = window.location.pathname;

    let inverse =
        pathname === "/" ||
            pathname === "/searchResult" ||
            pathname === "/myPrescription" ||
            pathname === "/prescription" ||
            pathname === "/searchstore"
            ? false
            : true;

    return (
        <>
            <div className={clsx(classes.root, inverse && classes.rootInverse)}>
                <div className={classes.left}>
                    <h1>Help us get more inventory in your area</h1>
                    <p>
                        Tell us which pharmacy you’d like to see on Dawaaii and
                        we’ll work with them to get their inventory online.
                    </p>
                    <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSf967N0KHtCUE_xrT4dENXMc3sl8WfSCneC7cVMqD_4O3raoA/viewform">
                    <button
                        className={clsx(
                            classes.suggestButton,
                            inverse && classes.suggestButtonInverse
                        )}
                    >
                        Suggest a pharmacy
                    </button>
                    </a>
                </div>
                <div className={classes.right}>
                    <img src="./assets/images/cloud_home.png" alt="" />
                </div>
            </div>
        </>
    );
}

export default HelpFindInventory;

// /Styles
const useStyle = makeStyles((theme) => ({
    root: {
        margin: " 2rem 15rem",
        // marginBottom: '7rem',
        padding: "2rem 2rem",

        border: "none",
        borderRadius: "15px",

        display: "flex",
        justifyContent: "space-between",
        background: "rgba(196, 196, 196, 0.27)",
    },
    rootInverse: {
        background: "#fff",
    },
    left: {
        textAlign: "left",
        "& h1": {
            margin: '0',
            fontFamily: "gilroybold",
            fontSize: "30px",
            lineHeight: "46.88px",
            color: "#000",
        },
        "& p": {
            margin: '0',
            marginTop: "2rem",
            fontFamily: "gilroylight",
            fontSize: "20px",
            lineHeight: "35.16px",
            color: "#000",
        },
    },
    suggestButton: {
        background: "#48BF91",
        marginTop: "2rem",
        padding: "1rem",

        border: "none",
        borderRadius: "10px",

        fontFamily: "gilroymedium",
        fontSize: "20px",
        lineHeight: "35.16px",
        color: "#fff",
        cursor: "pointer",
    },
    suggestButtonInverse: {
        background: "rgba(196, 196, 196, 0.27)",
        color: "#000",
    },
    right: {
        // marginRight: "0rem",
        display: 'flex',
        alignItems: 'center',
        "& img": {
            // marginLeft: "8rem",
            textAlign: "center",
            width: "200px",
        },
    },

    [theme.breakpoints.down(600)]: {
        root: {
            margin: "1rem",

            borderRadius: "10px",

            flexDirection: "column",
        },
        left: {
            "& h1": {
                width: "100%",
                fontSize: "20px",
                lineHeight: '30px',
            },
            "& p": {
                width: "100%",
                fontSize: "18px",
            },
        },
        suggestButton: {
            width: "100%",

            fontSize: "18px",
        },
        right: {
            margin: "0",
            marginTop: "2rem",
            textAlign: "center",
            "& img": {
                marginLeft: "0",
                width: "150px",
            },
        },
    },
}));
