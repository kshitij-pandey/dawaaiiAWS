import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

function HelpNumber() {
    const classes = useStyle();
    let pathname = window.location.pathname;

    let inverse =
        pathname === "/" || pathname === "/searchResult" || pathname === "/searchstore" ? false : true;

    return (
        <>
            <div className={classes.needHelp}>
                <h1>Need Help ?</h1>
                <div
                    className={clsx(
                        classes.whatsappNumber,
                        inverse && classes.whatsappNumberInverse
                    )}
                >
                    <img src="./assets/images/whatsapp4.png" alt="" />
                    <a
                        style={{ textDecoration: "none" }}
                        href="https://wa.me/917678394361"
                    >
                        <p>+91 7678394361</p>
                    </a>
                </div>
            </div>
        </>
    );
}

export default HelpNumber;

//styles
const useStyle = makeStyles((theme) => ({
    needHelp: {
        margin: "0rem 0 2rem",
        // marginTop: '6rem',
        // paddingBottom: '6rem',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& h1": {
            margin: "0",
            fontFamily: "gilroybold",
            fontSize: "20px",
            lineHeight: "60px",
            color: "rgba(49, 49, 49, 0.83)",
        },
    },
    whatsappNumber: {
        padding: ".4rem 2rem",
        marginLeft: "4rem",
        display: "flex",
        alignItems: "center",
        background: "#A8F2BC",
        borderRadius: "10px",
        cursor: "pointer",
        "& img": {
            width: "40px",
            height: "40px",
        },
        "& p": {
            margin: "0",
            fontFamily: "gilroymedium",
            fontSize: "20px",
            lineHeight: "58.59px",
            color: "#000",
        },
    },
    whatsappNumberInverse: {
        background: "#fff",
    },
    [theme.breakpoints.down(600)]: {
        needHelp: {
            flexDirection: "column",
            "& h1": {
                fontSize: "20px",
            },
        },
        whatsappNumber: {
            marginLeft: "0rem",
            padding: ".4rem 2rem",
            "& p": {
                fontSize: "18px",
            },
        },
    },
}));
