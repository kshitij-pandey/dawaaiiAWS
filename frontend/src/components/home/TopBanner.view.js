import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import React from "react";

function TopBanner() {
    const history = useHistory();
    const classes = useStyle();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.section}>
                    <div className={classes.one}>
                        <h3>
                            We distribute <strong>medicine</strong> to everyone
                        </h3>
                        <p>
                            Find medicines & treatments in nearby pharmacies and
                            save on both medicines and delivery charges.
                        </p>
                    </div>
                    <div className={clsx(classes.two, classes.card)}>
                        <h1>Donate Medicine</h1>
                        <p>
                            Dawaaii drives the future of healthcare by
                            connecting people with surplus medicine
                        </p>
                      
                        <button
                            onClick={() => {
                                history.push("/donateMeds");
                            }}
                            className={classes.donateBtn}
                        >
                            Donate Now
                        </button>
                        <img src="./assets/images/HandMed.png" alt="hand med" />
                    </div>
                    <div className={clsx(classes.three, classes.card)}>
                        <img src="./assets/images/rxPen.png" alt="rxpen" />
                        <h1>My Medical Prescription</h1>
                        <p>
                            If you have your medical uploaded by you or your
                            hospital, then you can access it from here
                        </p>
                        <button
                            onClick={() => {
                                history.push("/myPrescription");
                            }}
                            className={classes.donateBtn}
                        >
                            Find Now
                        </button>
                    </div>
                </div>

                {/* //=================// */}
                {/* <div className={classes.section2} >
                    <div className={classes.card2}>
                        <img src="./assets/images/searchMed.png" alt="" />
                        <h3>Check Item Stock</h3>
                        <p>Check medicine inventory at numerous stores at
                            a glance and easily find what you're looking
                            for.</p>
                    </div>
                    <div className={classes.card2}>
                        <img src="./assets/images/DesktopCompair.png" alt="" />
                        <h3>Compare Price</h3>
                        <p>Check prices at different retailers to get the
                            best deal, no matter what medicine you are
                            searching for.</p>
                    </div>
                    <div className={classes.card2}>
                        <img src="./assets/images/LocalShop.png" alt="" />
                        <h3>Vocal for Local</h3>
                        <p>More than ever, your local businesses need
                            your help. Find the same medicine you might buy
                            online from a local retailer.</p>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default TopBanner;

//styles
const useStyle = makeStyles((theme) => ({
    root: {
        margin: "6rem 2rem",
    },
    section: {
        // marginLeft: '3rem',
        marginTop: "3rem",
        // marginRight: '2rem',
        marginBottom: "5rem",

        display: "flex",
        justifyContent: "flex-end",

        "& div": {
            // flex: 'auto 1 1',
        },
    },

    card: {
        width: "23rem",
        position: "relative",
        padding: "2rem",
        // paddingBottom: '0',
        margin: "0 1rem",
        // width: '27rem',
        borderRadius: "10px",
        background: "rgba(196, 196, 196, 0.27)",

        "& img": {
            position: "absolute",
            right: "1rem",
            bottom: "0",
        },

        "& h1": {
            fontFamily: "gilroybold",
            fontSize: "25px",
            color: "rgba(49, 49, 49, 0.83)",
            lineHeight: "29.3px",
        },

        "& p": {
            marginTop: "1rem",
            width: "12rem",
            fontFamily: "gilroymedium",
            fontSize: "15px",
            color: "rgba(49, 49, 49, 0.59)",
            lineHeight: "22px",
        },
        "& button": {
            // paddingLeft: "1rem",
            marginTop: "1rem",
            marginBottom: ".1rem",
            width: "132px",
            height: "44px",
            background: "#48BF91",

            fontFamily: "gilroymedium",
            color: "#fff",

            textAlign: "center",

            border: "none",
            borderRadius: "5px",
            transition: "margin .4s",
            // transition: 'boxShadow .4s',
            "&:hover": {
                cursor: "pointer",
                marginTop: "1.1rem",
                marginBottom: "0rem",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            },
        },
    },
    one: {
        marginLeft: "1rem",
        flexGrow: "1",
        // width: '50%',
        "& h3": {
            width: "27rem",
            // margin: '2rem 0 0 0',
            fontFamily: "gilroybold",
            fontSize: "35px",
            lineHeight: "40px",
            color: "rgba(49, 49, 49, 0.83)",
            "& strong": {
                color: "#48BF91",
            },
        },
        "& p": {
            marginTop: "1rem",
            width: "399px",
            fontFamily: "gilroymedium",
            fontSize: "20px",
            color: "rgba(49, 49, 49, 0.59)",
            lineHeight: "35px",
        },
    },

    //second card row
    section2: {
        margin: "3rem 0rem 6rem 0rem",

        display: "flex",
        justifyContent: "space-between",
    },
    card2: {
        margin: "0 1rem",
        padding: "3rem 2rem",

        flexBasis: "100%",

        background: "#74B9F9",
        border: "none",
        borderRadius: "15px",

        "& img": {
            width: "100px",
        },

        "& h3": {
            marginTop: "2rem",
            fontFamily: "gilroybold",
            fontSize: "30px",
            color: "#000",
            lineHeight: "35.16px",
        },
        "& p": {
            marginTop: "2rem",
            fontFamily: "gilroylight",
            fontSize: "25px",
            color: "#000",
            lineHeight: "29.3px",
        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            margin: "0 0rem",
        },
        section: {
            marginLeft: "1rem",
            marginTop: "2rem",
            marginRight: "1rem",

            display: "flex",
            flexDirection: "column",

            "& div": {
                flex: "auto 1 1",
            },
        },
        one: {
            margin: "0",
            marginBottom: "1rem",
            "& h3": {
                width: "325px",
                fontSize: "30px",
                lineHeight: "40px",
            },
            "& p": {
                width: "252px",
                fontSize: "15px",
                lineHeight: "25px",
            },
        },
        card: {
            width: "auto",
            margin: "1rem 0",
        },
        section2: {
            display: "none",
        },
    },
}));
