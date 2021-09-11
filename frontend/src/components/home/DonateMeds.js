import { makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

import NewNavbar from "../layouts/NewNavbar";
import Navbar from "../layouts/Navbar.layout";

const useStyle = makeStyles((theme) => ({
    root: {
        // position: 'relative',
    },
}));

function DonateMeds(props) {
    const history = useHistory();
    const classes = useStyle();
    let width = window.innerWidth;

    if (width > 600) {
        return (
            <div className={classes.root}>
                <Navbar showLogin={props.showLogin} />
                <div className="donate-cont">
                    <div className="text-side">
                        <div className="text">
                            Dawaaii drives the future of healthcare by
                            connecting people with surplus medicine
                        </div>
                        <div className="action-button">
                            <div className="ac-btn">
                                <button
                                    onClick={() => {
                                        window.location.href = "https://tripetto.app/run/NS7LGPCMT2";
                                    }}
                                    className="orange"
                                >
                                    Organization Donation
                                </button>
                            </div>
                            <div className="ac-btn">
                                <button
                                    onClick={() => {
                                        window.location.href = "https://tripetto.app/run/GLBVOZXNAR";
                                    }}
                                    className="white"
                                >
                                    Individual Donation
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="banner-img">
                        <img src="./assets/images/donate_banner.png" alt="" />
                    </div>
                </div>
                <div className="support-cont">
                    <div className="sup-header">
                        <b>Our</b> Supporters
                    </div>
                    <div className="logos">
                        <div className="logo">
                            <img
                                src="./assets/images/microsoft_logo.png"
                                alt=""
                            />
                        </div>
                        <div className="logo">
                            <img src="./assets/images/google_logo.png" alt="" />
                        </div>
                        <div className="logo">
                            <img src="./assets/images/anz_logo.png" alt="" />
                        </div>
                        <div className="logo">
                            <img
                                src="./assets/images/netflix_logo.png"
                                alt=""
                            />
                        </div>
                        <div className="logo">
                            <img src="./assets/images/apple_logo.png" alt="" />
                        </div>
                        <div className="logo">
                            <img src="./assets/images/fb_logo.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className={classes.root}>
                    <Navbar showLogin={props.showLogin} />
                    <div className="mob-donate-con">
                        <div className='mob-main-cont'>
                            <div className="mob-text">
                                Dawaaii drives the future of healthcare by
                                connecting people with surplus medicine
                            </div>
                            <div className="mob-btns">
                                <div className="mob-ac-btn">
                                    <button onClick={() => {
                                            history.push(
                                                "/indvidualDonationForm"
                                            );
                                        }} className="white">
                                        Individual Donation
                                    </button>
                                </div>
                                <div className="mob-ac-btn">
                                    <button onClick={() => {
                                            history.push(
                                                "/organizationDonationForm"
                                            );
                                        }} className="orange">
                                        Organization Donation
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mob-banner">
                            <img src="./assets/images/donate_banner.png" alt="donate_meds_banner"  />
                        </div>
                    </div>
                    <div className="mob-sup-con">
                        <div className="mob-sup-head">Our Supporters</div>
                        <div className="mob-sup-imgs">
                            <div className="imgs-row">
                                <img width='100px'
                                src="./assets/images/microsoft_logo.png"
                                alt=""
                                />
                                <img width='100px' src="./assets/images/anz_logo.png" alt="" />
                            </div>
                            <div className="imgs-row">
                                <img width='80px' src="./assets/images/apple_logo.png" alt="" />
                                <img width='80px'
                                src="./assets/images/netflix_logo.png"
                                alt=""
                            />
                            </div>
                            <div className="imgs-row">
                                <img width='80px' src="./assets/images/google_logo.png" alt="" />
                                <img width='80px' src="./assets/images/fb_logo.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DonateMeds;
