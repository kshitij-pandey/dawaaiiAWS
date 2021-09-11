import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import {
    setSelectedLocation,
    getGPSLocation,
    getAllStoresInCity,
    getAllStoresInCluster,
} from "../../../../redux/actions/location.action";
import { clusterSearch } from "../../../../redux/actions/product.action";
const url =
    window.location.host === "localhost:3000" ? "http://localhost:8000" : "";
function LocationList(props) {
    const [locationList, setLocationList] = useState([]);
    const [locality,setLocality]=useState("");
    const classes = useStyle();

    const setLocation = (loc) => {
        props.setSelectedLocation(loc);
        setLocality(loc.name);
    };

    useEffect(()=>{
        console.log(locality);
   if(locality!="") {    
        props.getAllStoresInCluster(locality);
        props.getAllStoresInCity(locality);
}
    },[locality])

    const GPSLocation = () => {
        console.log("getting gps location");
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            props.getGPSLocation(
                position.coords.latitude,
                position.coords.longitude
            );
            const longitude=position.coords.longitude;
            const lattitude=position.coords.latitude;
            axios.post(`${url}/location/setCordinates`, {longitude,lattitude}).then((ress) => {
        });

    })};

    useEffect(() => {
        setLocationList(props.location.locations);
    }, [props.location.locations]);

    return (
        <>
            <div className={classes.root}>
                {locationList.length > 0 ? (
                    <div className={classes.products}>
                        <div className={classes.productList}>
                            <div className={classes.item}>
                                <img
                                    src="./assets/images/Location1.png"
                                    alt=""
                                />
                                <div
                                    className={classes.locationInfo}
                                    onClick={(e) => GPSLocation()}
                                >
                                    <h4>Detect current location</h4>
                                    <p>Using GPS</p>
                                </div>
                            </div>
                            <hr style={{ margin: "0" }} />
                            {locationList.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={(e) => setLocation(item)}
                                >
                                    <div className={classes.item}>
                                        <img
                                            src="./assets/images/Location1.png"
                                            alt=""
                                        />
                                        <div className={classes.locationInfo}>
                                            <h4>{item.name}</h4>
                                            <p>{item.address}</p>
                                        </div>
                                    </div>
                                    <hr style={{ margin: "0" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    product: state.product,
    location: state.location,
});

export default connect(mapStateToProps, {
    setSelectedLocation,
    getGPSLocation,
    getAllStoresInCity,
    getAllStoresInCluster
})(LocationList);

//Style
const useStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        // marginLeft: '-8rem',
        // marginRight: '1rem',
        // textAlign: 'center',
        top: "1rem",
        // right: "8.5rem",
        zIndex: "10000",
    },
    products: {
        display: "center",
        justifyContent: "center",
    },
    productList: {
        width: "19rem",
        minHeight: "1rem",
        maxHeight: "27rem",
        background: "#fff",

        marginTop: "20px",

        border: "2px solid #C4C4C4",
        borderRadius: "10px",

        overflow: "scroll",
        overflowX: "hidden",

        "& ::-webkit-scrollbar": {
            width: "15px",
        },

        "& ::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 5px grey",
            borderRadius: "30px",
        },

        "& ::-webkit-scrollbar-thumb": {
            background: "#979797",
            borderRadius: "30px",
        },
    },
    item: {
        textAlign: "left",
        padding: ".8rem 1rem",
        cursor: "pointer",

        display: "flex",
        alignItems: "center",

        "& img": {
            marginRight: "1rem",
        },

        "& > div": {
            // lineHeight: '4px',
            display: "flex",
            flexDirection: "column",
            "& h4": {
                margin: "0px",
                fontFamily: "gilroyregular !important",
                fontSize: "13px !important",
                lineHeight: "20.23px !important",
                alignItems: "center",
            },
            "& p": {
                margin: "0px",
                fontFamily: "gilroylight !important",
                fontSize: "10px !important",
                lineHeight: "10.38px",
                color: "#B8B8B8",
                alignItems: "center",
            },
        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            // marginLeft: '0rem',
            // marginTop: '-4.5rem',

            top: "3.2rem",
            right: "0rem",
        },
    },
}));
