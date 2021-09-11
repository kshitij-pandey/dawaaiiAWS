import { makeStyles } from '@material-ui/core';
import React from 'react'


function SearchBar({ keyword, setKeyword }) {
    const classes = useStyle();
    console.log(setKeyword);

    return (
        <>
            <div className={classes.searchRoot} >
                <div className={classes.search}>
                    <div className={classes.searchWrapper}>
                        <div className={classes.locationWrapper}>
                            <img className={classes.location} src="./assets/images/location.png" alt="" />
                            <div className={classes.Right}>
                                <select className={classes.selectOne} name="" id="">
                                    <option className={classes.optionField} value="0"> IIT BHU</option>
                                    <option className={classes.optionField} value="0"> IIT KAH</option>
                                    <option className={classes.optionField} value="0"> IIT MUM</option>
                                    <option className={classes.optionField} value="0"> IIT BHU</option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.wordWrapper}>
                            <div className={classes.searchIcon}>
                                <img className={classes.searchPng} src="./assets/images/search.png" alt="" />
                            </div>
                            <input
                                className={classes.barStyle}
                                key="osme1"
                                value={keyword}
                                placeholder="Serach for medicine or a medical store"
                                onChange={e => setKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar;

//styles
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        dispaly: 'flex',
        justifyContent: 'center',

        marginRight: '4rem',
    },
    searchWrapper: {
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px'
    },
    locationWrapper: {
        display: 'flex',
    },
    location: {
        background: '#fff',
        borderLeft: '1px solid #B8B8B8',
        borderTop: '1px solid #B8B8B8',
        borderBottom: '1px solid #B8B8B8',
        borderRadius: '10px 0 0 10px',
        padding: '.8rem',
    },
    selectOne: {
        width: '5rem',
        height: '25px',
        border: 'none',
        borderTop: '1px solid #B8B8B8',
        borderBottom: '1px solid #B8B8B8',
        // height: '100%',
        outline: 'none',
    },
    optionField: {
        fontFamily: 'gilroymedium',
        fontSize: '20px',
        lineHeight: '23px',
        display: 'flex',
        alignItems: 'center',
    },
    wordWrapper: {
        display: 'flex',
    },
    wordWrapperMobile: {
        display: 'none',
    },
    searchIcon: {
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        borderTop: '1px solid #B8B8B8',
        borderBottom: '1px solid #B8B8B8',
    },
    searchPng: {
        width: '35px',
        borderLeft: '2px solid #000',
        marginLeft: '15px',
        padding: '5px 0 5px 15px',
        height: '15px,'
    },
    barStyle: {
        width: '21rem',
        border: 'none',
        padding: '.7rem',
        borderRadius: '0 10px 10px 0',
        borderTop: '1px solid #B8B8B8',
        borderRight: '1px solid #B8B8B8',
        borderBottom: '1px solid #B8B8B8',
        fontFamily: 'gilroylight',
        fontSize: '15px',
        lineHeight: '23px',
        display: 'flex',
        alignItems: 'center',
        outline: 'none',
    },
    orPara: {
        fontFamily: 'gilroymedium',
        fontSize: '20px',
        lineHeight: '23.44px',

        color: '#000',
    },
    prescriptionBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        background: '#fff',
        padding: '.5rem',
        marginLeft: '1rem',

        border: '1px solid #B8B8B8',
        borderRadius: '12px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

        "&:hover": {
            cursor: 'pointer',
        },
    },
    fileUploadImg: {
        paddingRight: '.6rem',
        marginRight: '.6rem',
        borderRight: '2px solid #000',
    },
    uploadPara: {
        textAlign: 'left',
        color: 'rgba(0, 0, 0, 0.42)',

        fontFamily: 'gilroylight',
        fontSize: '15px',
        lineHeight: '17.58px',
    },

    [theme.breakpoints.down(600)]: {
        searchRoot: {
            padding: '1rem',
        },
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        searchWrapper: {
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0)',
            borderRadius: '10px'
        },
        locationWrapper: {
            borderRadius: '10px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
        wordWrapper: {
            display: 'none',
        },
        selectOne: {
            borderRight: '1px solid #B8B8B8',
            borderRadius: '0 10px 10px 0',
        },
        orPara: {
            display: 'none',
        },
        wordWrapperMobile: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '10px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            marginTop: '1rem',
        },
        searchIconMobile: {
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            borderTop: '1px solid #B8B8B8',
            borderBottom: '1px solid #B8B8B8',
            borderLeft: '1px solid #B8B8B8',
            borderRadius: '10px 0 0 10px',
        },
        searchPngMobile: {
            width: '2rem',
            padding: '5px 0 5px 15px',
            height: '15px,'
        },
        barStyleMobile: {
            width: '100%',
            border: 'none',
            padding: '.7rem',
            borderRadius: '0 10px 10px 0',
            borderTop: '1px solid #B8B8B8',
            borderRight: '1px solid #B8B8B8',
            borderBottom: '1px solid #B8B8B8',
            fontFamily: 'gilroylight',
            fontSize: '15px',
            lineHeight: '23px',
            display: 'flex',
            alignItems: 'center',
            outline: 'none',
        }
    }
}));