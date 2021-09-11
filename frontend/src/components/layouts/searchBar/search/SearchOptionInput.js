import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

function SearchOptionInput({
    location,
    keyword,
    locationString,
    setKeyword,
    setLocation,
    selectedLocation,
    product
}) {
    const classes = useStyle();
    // console.log('location: ', location);
    const [loc, setLoc] = useState("");

    useEffect(() => {
        location.selectedLocation !== null
            ? setLoc(location.selectedLocation.name)
            : setLoc(locationString);
    }, [locationString]);


    //Unused, Not implemented
    // const [prodInputDisabled, setProdInputDisabled] = useState(true);
    // const [prodSearchPlaceHolder, setProdSearchPlaceHolder] = useState('');
    // useEffect(() => {
    //     if (location.selectedLocation !== null) {
    //         setProdSearchPlaceHolder('Serach for medicine or a medical store')
    //         setProdInputDisabled(false);
    //     } else {
    //         setProdSearchPlaceHolder('Please set location before search')
    //         setProdInputDisabled(true);
    //     }
    // }, [locationString]);



    return (
        <>
            <div className={classes.root}>
                <div className={classes.search}>
                    <div className={classes.searchWrapper}>
                        <div
                            className={classes.locationWrapper}
                            // onClick={e => { e.stopPropagation(); setLocation(e.target.value) }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setLocation(loc);
                            }}
                        >
                            <img
                                className={classes.location}
                                src="./assets/images/location.png"
                                alt=""
                            />
                            <input
                                className={classes.selectOne}
                                // key="osme1"
                                value={loc}
                                placeholder="Select location"
                                onChange={(e) => setLocation(e.target.value)}
                            // onClick={e => { setLocation() }}

                            // readOnly
                            />
                            <img
                                className={classes.downArrow}
                                src="./assets/images/DownArrow1.png"
                                alt=""
                            />
                        </div>

                        {/* <div className={classes.mobilePrescription}>
                            <div className={classes.prescriptionBtn} >
                                <img src="./assets/images/File_upload.png" alt="" />
                                <h5>Upload Prescription</h5>
                            </div>
                        </div> */}

                        <div className={classes.wordWrapper}>
                            <div className={classes.searchIcon}>
                                <img
                                    className={classes.searchPng}
                                    src="./assets/images/search.png"
                                    alt=""
                                />
                            </div>
                            <input
                                className={classes.barStyle}
                                value={keyword}
                                placeholder="Search for medicine or a medical store"
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setKeyword(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className={classes.prescriptionUpload} >
                        <p>OR</p>
                        <div className={classes.prescriptionBtn} >
                            <img src="./assets/images/File_upload.png" alt="" />
                            <h5>Upload Prescription</h5>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    products: state.product,
    location: state.location,
});

export default connect(mapStateToProps, {})(SearchOptionInput);

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 1rem",
    },
    mobilePrescription: {
        display: "none",
    },
    search: {
        // width: '26.5rem',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        marginRight: "1rem",
    },
    searchWrapper: {
        display: "flex",
        justifyContent: "center",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
    },
    locationWrapper: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "& input": {
            fontFamily: "gilroylight",
            fontSize: "15px",
            lineHeight: "23px",
        },
    },
    location: {
        background: "#fff",
        borderLeft: "1px solid #B8B8B8",
        borderTop: "1px solid #B8B8B8",
        borderBottom: "1px solid #B8B8B8",
        borderRadius: "10px 0 0 10px",
        padding: ".9rem",
        height: "100%",
    },
    selectOne: {
        width: "4rem",
        height: "25px",
        border: "none",
        borderTop: "1px solid #B8B8B8",
        borderBottom: "1px solid #B8B8B8",
        height: "100%",
        outline: "none",
        cursor: "pointer",
        overflow: "hidden !important",
        textOverflow: "ellipsis",
    },
    downArrow: {
        display: "none",
        background: "#fff",
        // borderLeft: '1px solid #B8B8B8',
        borderTop: "1px solid #B8B8B8",
        borderBottom: "1px solid #B8B8B8",
        // borderRadius: '10px 0 0 10px',
        padding: "1.5rem",
    },
    optionField: {
        fontFamily: "gilroymedium",
        fontSize: "20px",
        lineHeight: "23px",
        display: "flex",
        alignItems: "center",
    },
    wordWrapper: {
        display: "flex",

        "& :disabled": {
            background: "#fff",
        },
    },
    searchIcon: {
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderTop: "1px solid #B8B8B8",
        borderBottom: "1px solid #B8B8B8",
    },
    searchPng: {
        // width: '2.5rem',
        borderLeft: "2px solid #000",
        marginLeft: "15px",
        padding: "5px 0 5px 15px",
        height: "15px,",
    },
    barStyle: {
        width: "23rem",
        border: "none",
        padding: ".7rem",
        borderRadius: "0 10px 10px 0",
        borderTop: "1px solid #B8B8B8",
        borderRight: "1px solid #B8B8B8",
        borderBottom: "1px solid #B8B8B8",
        fontFamily: "gilroylight",
        fontSize: "15px",
        lineHeight: "23px",
        display: "flex",
        alignItems: "center",
        outline: "none",
    },
    prescriptionUpload: {
        display: "flex",
        alignItems: "center",

        "& p": {
            margin: "1rem",
            fontFamily: "gilroymedium",
            fontSize: "20px",
            lineHeight: "23.44px",
        },
    },
    prescriptionBtn: {
        width: "11rem",
        padding: ".7rem",

        display: "flex",
        alignItems: "center",

        border: "1px solid rgba(184, 184, 184, 1)",
        borderRadius: "12px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",

        cursor: "pointer",

        "& img": {
            paddingRight: "1rem",

            borderRight: "2px solid #B8B8B8",
        },

        "& h5": {
            marginLeft: "1rem",
            textAlign: "left",

            fontFamily: "gilroylight",
            fontSize: "15px",
            lineHeight: "17.58px",
            color: "rgba(0, 0, 0, 0.42)",
        },
    },

    [theme.breakpoints.down(600)]: {
        root: {
            // justifyContent: 'center',
            padding: "0rem",
        },
        search: {
            marginRight: "0",
        },
        searchWrapper: {
            width: "100%",
            marginTop: "1rem",
            // marginBottom: '3rem',
            // flexDirection: 'column',
            flexWrap: "wrap",
            justifyContent: "space-between",

            boxShadow: "none",
        },
        locationWrapper: {
            width: "100%",
            justifyContent: "center",
            // marginBottom: '1rem',

            borderRadius: "10px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        },
        location: {
            // width: '100%',
            height: "3rem",
        },
        selectOne: {
            width: "100%",
            height: "3rem",
            borderRight: "0",
            borderRadius: "0",
        },
        downArrow: {
            display: "block",
            // width: '100%',
            background: "#fff",
            borderRight: "1px solid #B8B8B8",
            borderTop: "1px solid #B8B8B8",
            borderBottom: "1px solid #B8B8B8",
            borderRadius: "0 10px 10px 0",
            padding: "18px",
        },
        mobilePrescription: {
            display: "block",
        },
        wordWrapper: {
            width: "100%",
            marginTop: "1rem",
            // display: 'flex',
            borderRadius: "10px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        },
        searchIcon: {
            borderRadius: "10px 0 0 10px ",
            borderLeft: "1px solid #B8B8B8",
        },
        searchPng: {
            width: "30px",
            borderLeft: "0",
            marginLeft: "0px",
        },
        barStyle: {
            width: "100%",
            borderTop: "1px solid #B8B8B8",
        },
        prescriptionUpload: {
            display: "none",
        },
        prescriptionBtn: {
            width: "9rem",
            padding: ".35rem",
            "& img": {
                paddingRight: ".5rem",
            },

            "& h5": {
                marginLeft: ".5rem",
                fontSize: "13px",
            },
        },
    },
}));
