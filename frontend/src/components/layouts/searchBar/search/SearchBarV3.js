import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core';

import { removeSearchMed, } from '../../../../redux/actions/product.action';


function SearchBarV3({
    location,
    keyword,
    locationString,
    setKeyword,
    setLocation,
    product,
    removeSearchMed,
    clusterSearch,
    searchInput
}) {
    const classes = useStyle();

    const [loc, setLoc] = useState("IIT BHU");

    function removeFromSearch(name) {
        console.log(name);
        removeSearchMed(name)
    }


    useEffect(() => {
        location.selectedLocation !== null
            ? setLoc(location.selectedLocation.name)
            : setLoc(locationString);
    }, [locationString]);

    return (
        <>
            <div className={classes.root}>
                <div className={classes.locationRoot}>
                    <div className={classes.locationWrapper}>
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
                        />
                        <img
                            className={classes.downArrow}
                            src="./assets/images/DownArrow1.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    location: state.location,
    product: state.product
})

export default connect(mapStateToProps, { removeSearchMed, })(SearchBarV3);



//styles
const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        marginTop: '-1.8rem',
        // margin: '-2rem -19rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent:"center",

    },
    locationRoot: {
        padding: '.7rem 1rem',

        border: '1px solid #B8B8B8',
        borderRadius: '10px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        webkitBoxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        mozBoxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
        background: '#fff',
    },
    location: {
        width: '20px',
        height: '20px',
    },
    locationWrapper: {
        display: 'flex',
        '& img': {
        },
        '& input': {
            width: '316px',
            height:"28px",
            border: 'none',
            outline: 'none',
            fontFamily: "gilroylight",
            fontSize: "15px",
            lineHeight: "23px",
        },
    },
    downArrow: {
        display: 'none',
    },
    searchRoot: {
        // position: 'absolute',
        // marginTop: '2.5rem',
        marginLeft: '1rem',
        background: '#fff',
        border: '1px solid #B8B8B8',
        borderRadius: '10px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        webkitBoxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        mozBoxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
    },
    searchWrapper: {
        padding: '.7rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& input': {
            width: '300px',
            padding: '0 1rem',
            border: 'none',

            fontFamily: "gilroylight",
            fontSize: "15px",
            lineHeight: "23px",
            outline: 'none',
        },
        '& button': {
            padding: '.3rem 2rem',

            background: 'rgba(8, 135, 252, 0.63)',
            border: 'none',
            borderRadius: '3px',

            fontFamily: "gilroylight",
            fontSize: "15px",
            lineHeight: "23px",
            color: '#fff',
        },
    },
    searchIcon: {
        width: '20px',
        height: '20px',
    },
    searchingList: {
        width: '400px',

        '& ul': {
            background: '#fff',
            display: 'flex',
            flexWrap: 'wrap',
            // gridGap: '10px',
            // gridTemplateColumns: 'repeat(2, 1fr)',
            padding: '.6rem',
            borderRadius: '10px',

            '& li': {
                margin: '.2rem',
                padding: '.3rem .8rem',
                borderRadius: '3px',
                background: 'rgba(0, 99, 249, 0.6)',
                fontFamily: "gilroymedium",
                fontSize: "12px",
                lineHeight: "23px",
                color: '#fff',
                '& i': {
                    marginLeft: '.5rem',
                }
            },
        },
    },

    [theme.breakpoints.down(600)]: {
        root: {
            position: 'relative',
            margin: '1rem',
            flexDirection: 'column',
        },
        locationRoot: {
            // padding: '0',
            width: '100%',
        },
        locationWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            '& input': {
                width: '250px',
                // fontSize: '20px',
            }
        },
        downArrow: {
            display: 'block',
        },
        searchRoot: {
            marginTop: '1rem',
            width: '100%',
            margin: '0',
        },
        searchingList: {
            width: '100%',
        },
    },
}));
