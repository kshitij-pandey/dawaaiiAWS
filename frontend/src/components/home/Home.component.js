import { makeStyles } from "@material-ui/core";
import React from "react";


import TopBanner from './TopBanner.view'
import Navbar from '../layouts/Navbar.layout';
import HelpFindInventory from '../General/patch/HelpFindInventory.patch';
import HelpNumber from '../General/patch/HelpNumber.patch';
import Footer from '../layouts/Footer.layout';
// import Banner2 from '../General/banners/Banner2';
// import BaseMap from "../General/patch/BaseMap";

const useStyle = makeStyles((theme) => ({
    root: {
        // position: 'relative',
    },
}));

function Home(props) {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <Navbar showLogin={props.showLogin} />
            <TopBanner />
            {/* <Banner2 /> */}
            <HelpFindInventory />
            <HelpNumber />
            <Footer />
        </div>
    );
}

export default Home;
