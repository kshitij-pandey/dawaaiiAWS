import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Modal from "@material-ui/core/Modal";

import BaseMap from "../../General/patch/BaseMap";
// import BaseMap2 from '../../General/patch/BaseMap2';
import BaseMapGK from "../../General/patch/BaseMapGK";
import {
    getLocations,
    setMapCoords,
    setSelectedLocation,
} from "../../../redux/actions/location.action";
import {
    addNumber,
    addAddress,
    addPerson,
    storeAddress,
} from "../../../redux/actions/order.action";
import { getUserDetails } from "../../../redux/actions/Auth.action";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    // const top = 50 + rand();
    // const left = 50 + rand();
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "block",
        textAlign: "center",
        outline: "none",
        position: "absolute",
        width: 600,
        height: 600,
        maxHeight: 600,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
    mobilPaper: {
        width: "100%",
        height: "100vh",
        textAlign: "center",
        outline: "none",
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
    },
    mobilePaper: {
        display: "none",
    },
    topSearchbar: {
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "& h2": {
            margin: "0",
            fontFamily: "gilroybold",
            fontSize: "25px",
            lineHeight: "40px",
        },

        "& img": {
            width: "20px",
            height: "20px",
            cursor: "pointer",
        },
    },
    locSearchBar: {
        padding: "0 1rem",
        margin: "0 1rem",
        // width: '100%',
        display: "flex",
        alignItems: "center",
        // position: 'relative !important',

        border: "1px solid #F36D31",
        borderRadius: "10px",
        "& img": {
            width: "20px",
            height: "20px",
        },
        "& input": {
            paddingLeft: "1rem",
            width: "100%",
            border: "none",
            outline: "none",

            fontFamily: "gilroyregular",
            fontSize: "15px",
            lineHeight: "40px",
        },
    },
    locMapBar: {
        // position: 'absolute',
        // marginLeft: '-2rem',
        width: 600,
        "& p": {
            position: "absolute",
            marginTop: "-12rem",
            marginLeft: ".7rem",
            background: "#fff",
            padding: ".5rem .8rem",
            borderRadius: "60px",
            cursor: "pointer",
        },
    },
    selectMap: {
        margin: "0 1rem",
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        "& img": {
            width: "30px",
            height: "30px",
        },
        "& p": {
            margin: "0",
            marginLeft: ".7rem",
            fontFamily: "gilroymedium",
            fontSize: "15px",
            lineHeight: "40px",
        },
        cursor: "pointer",
    },

    //search result
    locationList: {
        // marginTop: '10rem',
        margin: " 1rem",
        maxHeight: 400,
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        fontFamily: "gilroybold",
        fontSize: "12px",
        color: "#8d8d8d",
        overflowY: "auto",
        zIndex: "1000",
    },
    location: {
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "& img": {
            width: "15px",
            height: "15px",
        },
    },
    locationText: {
        marginLeft: "1rem",
        "& h4": {
            margin: "0",
            fontFamily: "gilroybold",
            fontSize: "15px",
            color: "#000",
        },
        "& p": {
            margin: "0",
            fontFamily: "gilroyregular",
            fontSize: "12px",
        },
    },

    //form
    address: {
        margin: "1rem",
        marginTop: "2rem",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "20px",
        textAlign: "left",
    },
    formControl: {
        " & label": {
            fontFamily: "gilroymedium",
            fontSize: "15px",
            color: "#8d8d8d",
        },
        "& >div": {
            padding: "10px 5px",
            marginTop: ".5rem",
            border: "1px solid #d8d8d8",
            borderRadius: "10px",
            "& i": {
                color: "#8d8d8d",
            },
            "& input": {
                width: "160px",
                marginLeft: ".7rem",
                border: "none",
                textOverflow: "ellipsis",
                outline: "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
        },
    },
    addressBtn: {
        margin: "1rem",
        padding: ".5rem 0",
        marginTop: "1rem",
        width: "400px",

        border: "none",
        borderRadius: "50px",
        color: "#fff",
        background: "#8d8d8d",
    },
    BtnActive: {
        background: "#F36D31",
    },

    [theme.breakpoints.down(600)]: {
        paper: {
            // margin: '0 1rem',
            display: "none",
            // width: '100%',
            // height: 'auto',
            // overflowY: 'scroll',
        },
        mobilePaper: {
            height: "100vh",
            width: "100%",
            display: "block",
            textAlign: "center",
            outline: "none",
            position: "absolute",
            backgroundColor: theme.palette.background.paper,
            overflowY: "scroll",
        },
        topSearchbar: {
            width: "100%",
            marginTop: "0rem",
            position: "fixed",
            padding: "1rem",
            background: "#fff",

            // boxShadow: '-1px -7px 20px 0px rgba(0,0,0,0.75)',
            // webKitBoxShadow: '-1px -7px 20px 0px rgba(0,0,0,0.75)',
            // mozBoxShadow: '-1px -7px 20px 0px rgba(0,0,0,0.75)',

            "& h2": {
                marginLeft: "2rem",
                fontSize: "20px",
            },
            zIndex: "100",
        },
        locMapBar: {
            width: "100%",
            marginTop: "5rem",
        },
        locSearchBar: {
            margin: "1rem",
            marginTop: "5rem",
        },
        selectMap: {
            margin: "0",
            padding: "1rem",
        },
        locationList: {
            marginTop: "1rem",
            padding: "1rem",
        },
        address: {
            gridTemplateColumns: "repeat(1, 1fr)",
        },
        addressBtn: {
            width: "100%",
            position: "relative",
            left: "0",
            margin: "0",
            marginBottom: "2rem",
        },
        addresBtnDiv: {
            width: "100%",
            // position: 'fixed',
            padding: "1rem",
        },
    },
}));

const AddAddressModal = (props) => {
    const classes = useStyles();
    const [width, setWidth] = useState(window.innerWidth);
    let isMobile = width <= 600;
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    // const [open, setOpen] = React.useState(false);
    const [keyWord, setKeyWord] = useState("");
    const [isdropLocSelected, setIsdropLocSelected] = useState(false);
    const [dropAddress, setDropAddress] = useState({});
    const [continueBtnActive, setContinueBtnActive] = useState(false);
    const [isMapViewSelected, setIsMapViewSelected] = useState(false);
    const [isLocationSelected, setIsLocationSelected] = useState(false);

    //form data
    const [roomNo, setRoomNo] = useState("");
    const [near, setNear] = useState("");
    const [person, setPerson] = useState("");
    const [contactDetail, setContactDetail] = useState("");

    let token = localStorage.getItem("Auth-token");

    let locString = {
        string: keyWord,
    };

    // console.log(dropAddress);

    const formatDropAddres = (loc) => {
        if (loc.address) {
            let address = `${loc.address}, India`;
            setDropAddress(address);
        }
    };

    const selectLocation = (loc) => {
        setDropAddress(loc);
        setIsdropLocSelected(true);
        setIsMapViewSelected(true);
        setIsLocationSelected(true);
        props.setMapCoords(loc.name);
        props.setSelectedLocation(loc);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        let userAddress = { roomNo, near, person, contactDetail };
        let drop = {};
        drop.address = `${roomNo}, ${near}, ${dropAddress.address}`;
        drop.person = person;
        drop.contact = contactDetail;
        setDropAddress(drop);
        props.addAddress(`${roomNo}, ${near}, ${dropAddress.address}`);
        // props.storeAddress(
        //     `${roomNo}, ${near}, ${props.location.selectedLocation.address}`,
        //     props.auth.user.phoneNo
        // );
        // console.log(props.location.selectedLocation.address)
        props.addPerson(drop.person);
        console.log(dropAddress);
        props.setOpenAddAddressModal(false);
        props.getUserDetails(token);
    };

    const handleOpen = () => {
        props.setOpenAddAddressModal(true);
    };

    const handleClose = () => {
        props.setOpenAddAddressModal(false);
    };

    useEffect(() => {
        if (keyWord && keyWord.length > 0) {
            props.getLocations(locString);
            setIsdropLocSelected(false);
        }
    }, [keyWord]);

    useEffect(() => {
        if (
            roomNo !== "" &&
            near !== "" &&
            person !== "" &&
            contactDetail.length === 10
        ) {
            setContinueBtnActive(true);
        } else {
            setContinueBtnActive(false);
        }
    }, [roomNo, near, person, contactDetail]);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        if (
            props.location.selectedLocation &&
            props.location.selectedLocation.address
        ) {
            setDropAddress(props.location.selectedLocation);
        }
    }, [props.location.selectedLocation]);

    useEffect(() => {
        setIsdropLocSelected(false);
        setIsLocationSelected(false);

        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const body = (
        // <div style={modalStyle} className={classes.paper}>
        <>
            <div className={classes.topSearchbar}>
                <h2 id="simple-modal-title">Search Drop Location</h2>
                <img
                    src="./assets/images/close.png"
                    onClick={handleClose}
                    alt="close"
                />
            </div>
            {isMapViewSelected ? (
                <div className={classes.locMapBar}>
                    <BaseMapGK
                        isLocationSelected={isLocationSelected}
                        setIsLocationSelected={setIsLocationSelected}
                    />
                    <p onClick={(e) => setIsMapViewSelected(false)}>
                        <strong>&#8592;</strong>
                    </p>
                </div>
            ) : (
                <>
                    <div className={classes.locSearchBar}>
                        <img src="./assets/images/search.png" alt="" />
                        <input
                            className={classes.barStyle}
                            value={keyWord}
                            placeholder="Search for an area, location name"
                            onChange={(e) => {
                                e.stopPropagation();
                                setKeyWord(e.target.value);
                            }}
                        />
                    </div>
                    <div
                        className={classes.selectMap}
                        onClick={(e) => {
                            setIsMapViewSelected(true);
                            setIsdropLocSelected(true);
                            setIsLocationSelected(false);
                        }}
                    >
                        <img src="./assets/images/aim.png" alt="aim" />
                        <p>Select location via map</p>
                    </div>
                </>
            )}

            {/* <SimpleModal /> */}
            {/* <BaseMap /> */}
            {/* Search location result */}
            {!isdropLocSelected ? (
                <div className={classes.locationList}>
                    <p>SEARCH RESULT</p>
                    {props.location &&
                        props.location.locations.map((loc) => (
                            <>
                                <div
                                    className={classes.location}
                                    onClick={(e) => {
                                        selectLocation(loc);
                                    }}
                                >
                                    <img
                                        src="./assets/images/search.png"
                                        alt=""
                                    />
                                    <div className={classes.locationText}>
                                        <h4>{loc.name}</h4>
                                        <p>{loc.address}</p>
                                    </div>
                                    <hr style={{ margin: "0" }} />
                                </div>
                            </>
                        ))}
                </div>
            ) : (
                <>
                    <form
                        id="addressForm"
                        onSubmit={formSubmit}
                        className={classes.address}
                    >
                        <div className={classes.formControl}>
                            <label htmlFor="roomNo">
                                Flat, Floor, Building Name
                            </label>
                            <div>
                                <i className="fas fa-home"></i>
                                <input
                                    type="text"
                                    id="roomNo"
                                    name="roomNo"
                                    placeholder="e.g. 2nd floor, office"
                                    onChange={(e) => setRoomNo(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.formControl}>
                            <label htmlFor="near">How to reach</label>
                            <div>
                                <i className="fas fa-directions"></i>
                                <input
                                    type="text"
                                    id="near"
                                    name="near"
                                    placeholder="E.g. Near metro station"
                                    onChange={(e) => setNear(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.formControl}>
                            <label htmlFor="person">Contact Person Name</label>
                            <div>
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    id="person"
                                    name="person"
                                    placeholder="e.g. Nikhil"
                                    onChange={(e) => setPerson(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.formControl}>
                            <label htmlFor="contactDetail">
                                Contact detail
                            </label>
                            <div>
                                <i className="fas fa-phone"></i>
                                <input
                                    type="number"
                                    id="contactDetail"
                                    name="contactDetail"
                                    placeholder="e.g. 1234567890"
                                    onChange={(e) =>
                                        setContactDetail(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </form>
                    <div className={classes.addresBtnDiv}>
                        <button
                            className={clsx(
                                classes.addressBtn,
                                continueBtnActive ? classes.BtnActive : ""
                            )}
                            form="addressForm"
                            disabled={!continueBtnActive}
                            type="submit"
                        >
                            Continue
                        </button>
                    </div>
                </>
            )}
        </>
    );

    return (
        <div>
            <Modal
                open={props.openAddAddressModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {isMobile ? (
                    <div className={classes.mobilePaper}>{body}</div>
                ) : (
                    <div style={modalStyle} className={classes.paper}>
                        {body}
                    </div>
                )}
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
    location: state.location,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getUserDetails,
    getLocations,
    setSelectedLocation,
    addNumber,
    addAddress,
    addPerson,
    setMapCoords,
    storeAddress,
})(AddAddressModal);
