import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';


import { addNumber, addAddress } from '../../../../redux/actions/order.action';
import { getLocations } from '../../../../redux/actions/location.action';

import GeneralCustomButton from '../../../common/Button.common';
import LocatoionList from '../../searchBar/search/LocationList';
import clsx from 'clsx';




const CustomerInfo1 = (props) => {
    let v1 = { paddingTop: '4rem', paddingBottom: '1rem', vertical1Height: '10rem', vertical2Height: '6rem' }
    let v2 = { paddingTop: '4rem', paddingBottom: '3rem', vertical1Height: '9rem', vertical2Height: '10rem' }
    let v3 = { paddingTop: '1rem', paddingBottom: '3rem', vertical1Height: '6rem', vertical2Height: '8rem' }
    let v4 = { paddingTop: '2rem', paddingBottom: '3rem', vertical1Height: '5rem', vertical2Height: '8rem' }


    //State
    const [countryCode, setCountryCode] = useState('+91');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');

    const [addressString, setAddressString] = useState('');
    const [locationListShow, setLocationListShow] = useState(false)
    const [locationList, setLocationList] = useState();

    //Active Card
    const [isAddNumberOpen, setIsAddNumberOpen] = useState(true);
    const [isAddDeliveryAddressOpen, setIsAddDeliveryAddressOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false);


    let myBulletsStyle = isAddNumberOpen ? v1 : isAddDeliveryAddressOpen ? v2 : isOrderOpen ? v3 : v4;
    const classes = useStyle(myBulletsStyle);

    const { cart } = props.order;

    let totalPrice = 0;
    cart.map(product => {
        totalPrice += +product.products.productPrice * product.itemCount;
    })

    let token = localStorage.getItem('Auth-token');

    useEffect(() => {
        if (token) {
            setIsAddNumberOpen(false)
            setIsAddDeliveryAddressOpen(true);
            setMobileNumber(props.auth.phoneNo);
        }
    }, [token, props.auth.isAuthenticated])

    const handleNumberCardChange = () => {
        if (mobileNumber !== '') {
            setIsAddDeliveryAddressOpen(false)
            setIsOrderOpen(false);
            setIsAddNumberOpen(!isAddNumberOpen);
        }
    }
    const handleDeliveryCardChange = () => {
        setIsAddNumberOpen(false);
        setIsOrderOpen(false);
        setIsAddDeliveryAddressOpen(!isAddDeliveryAddressOpen)
        props.addNumber(mobileNumber)
    }
    const handleOrderCardChange = () => {
        setIsAddNumberOpen(false);
        setIsAddDeliveryAddressOpen(false)
        setIsOrderOpen(!isOrderOpen);
        props.addAddress(address)
    }

    let data = { string: addressString };

    function updateLocation(string) {
        props.location.selectedLocation = null;
        setAddressString(string);
        setLocationListShow(true);
    }

    useEffect(() => {
        if (addressString && addressString.length > 0) {
            props.getLocations(data);
            setLocationList(props.location.locations)
        }
    }, [addressString]);

    //Initial render
    useEffect(() => {
        document.addEventListener('click', () => {
            setLocationListShow(false)
        })
        // if (token) {
        //     props.getUserDetails(token)
        // }
    }, [])

    function showModal(e) {
        e.preventDefault();
        props.showLogin();
    }

    return (
        <>
            <div className={classes.main}>
                <div className={classes.root}>
                    <div className={classes.bullets} >
                        <div className={clsx(classes.outerCircle, token ? classes.hideThis : '')} >
                            <div className={classes.innerCircle}>
                                {isAddNumberOpen ?
                                    <div className={clsx(classes.grrenInnerCircle)}>
                                    </div>
                                    : ''}
                            </div>
                        </div>
                        <div className={clsx(classes.vertical1, token ? classes.hideThis : '')} ></div>

                        <div className={classes.outerCircle}>
                            <div className={classes.innerCircle}>
                                {isAddDeliveryAddressOpen ?
                                    <div className={clsx(classes.grrenInnerCircle)}>
                                    </div>
                                    : ''}
                            </div>
                        </div>

                        <div className={clsx(classes.vertical2)}></div>

                        <div className={classes.outerCircle}>
                            <div className={classes.innerCircle}>
                                {isOrderOpen ?
                                    <div className={classes.grrenInnerCircle}>
                                    </div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    location: state.location,
    order: state.order
})

export default connect(mapStateToProps, { addNumber, addAddress, getLocations })(CustomerInfo1);

const useStyle = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
        position: 'relative',
        background: '#F0F5F7',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '-2rem',
    },
    mobileRoot: {
        display: 'none',
    },
    bullets: {
        position: 'absolute',
        left: '3rem',
        textAlign: 'center',
        // marginRight: '2rem',
        paddingTop: v1 => v1.paddingTop,
        paddingBottom: v1 => v1.paddingBottom,
        // flex: '1'
        // minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: '1',
    },
    outerCircle: {
        background: '#fff',
        borderRadius: '50%',
        border: '5px solid #E5E5E5',
        height: '45px',
        width: '45px',
        position: 'relative',
    },
    innerCircle: {
        position: 'absolute',
        background: '#F0F5F7',
        border: '3px solid #B8B8B8',
        borderRadius: '50%',
        height: '33px',
        width: '33px',
        top: '3%',
        left: '3%',
        // margin: '-150px 0px 0px 150px',
    },
    grrenInnerCircle: {
        position: 'absolute',
        borderRadius: '50%',
        height: '25px',
        width: '25px',
        top: '3%',
        left: '4%',
        background: '#4CAF50',
    },
    vertical1: {
        marginLeft: '1.3rem',
        borderLeft: '2px solid black',
        height: v1 => v1.vertical1Height,
    },
    vertical2: {
        marginLeft: '1.3rem',
        borderLeft: '2px solid black',
        height: v1 => v1.vertical2Height,
    },

    form: {
        // flex: '1',
    },

    card: {
        position: 'relative',
        maxWidth: '687px',
        minWidth: '687px',
        marginBottom: '1rem',
        marginLeft: '8rem',
        padding: '1rem',
        paddingLeft: '2rem',
        paddingRight: '10rem',
        background: '#fff',

        borderRadius: '10px',

        '& h1': {
            fontFamily: 'gilroybold',
            fontSize: '25px',
            lineHeight: '60px',
            color: '#000',
            // animation: '$fadein1 1s',
        },
        '& p': {
            fontFamily: 'gilroyregular',
            fontSize: '15px',
            lineHeight: '20px',
            color: '#000',

            maxWidth: '544px',
            // animation: '$fadein1 1s',
        },


    },
    disableCard: {
        '& h1': {
            color: '#B8B8B8',
        },
        '& p': {
            color: '#B8B8B8',
        },
    },
    hideThis: {
        display: 'none',
    },
    // cardIn: { animation: '$fadein1 1s', },
    // cardOut: { animation: '$fadeout1 1s', },
    editPen: {
        position: 'absolute',
        right: '2rem',
        top: '2rem',
        cursor: 'pointer'
    },
    contactNumber: {
        width: '100%',
        marginTop: '1rem',
        marginBottom: '1rem',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        maxWidth: '420px',
        // animation: '$fadein1 1s',
    },
    countryCode: {
        display: 'flex',
        alignItems: 'center',

        // width: '4rem',
        marginRight: '1rem',
        padding: '0 .5rem',

        border: '1px solid #C4C4C4',
        borderRadius: '5px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        '& img': {

        },
        '& input': {
            width: '3rem',
            padding: '0 .5rem',

            border: 'none',
            fontFamily: 'gilroymedium',
            fontSize: '15px',
            lineHeight: '40px',

            outline: 'none',
        },
    },
    inputField: {
        // marginLeft: '1rem',
        width: '100%',
        padding: '0 2rem',
        border: '1px solid #C4C4C4',
        borderRadius: '5px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        '& input': {
            width: '100%',
            fontFamily: 'gilroylight',
            fontSize: '15px',
            lineHeight: '40px',
            border: 'none',

            outline: 'none',
        },
        // animation: '$fadein1 1s',
    },
    login: {
        marginRight: "0",
    },
    btn: {
        background: "#48BF91",
        color: "#ffffff",

        fontSize: "20px",
        fontFamily: "gilroymedium",

        width: "123px",
        height: "42px",

        border: "none",
        borderRadius: "5px",

        "&:hover": {
            cursor: "pointer",
        },
    },
    signinBtn: {
        width: '293px',
        marginTop: '1rem',
        background: '#1785EB',
        cursor: 'pointer',

        border: 'none',
        borderRadius: '100px',

        fontFamily: 'gilroybold',
        fontSize: '20px',
        lineHeight: '50px',
        color: '#fff',
    },
    payBtn: {
        width: '146px',
        background: '#F36D31',
        cursor: 'pointer',

        border: 'none',
        borderRadius: '5px',

        fontFamily: 'gilroybold',
        fontSize: '20px',
        lineHeight: '40px',
        color: '#fff',
    },

    [theme.breakpoints.down(600)]: {
        root: {
            display: 'none',
        },
        mobileRoot: {
        },
        card: {
            maxWidth: '500px',
            minWidth: '100px',
            margin: '0',
        },
    },

    '@keyframes fadein1': {
        '0%': {
            transform: 'translateY(-100%)'
        },
        '100%': {
            transform: 'translateY(0%)'

        }
    },
    '@keyframes fadeout1': {
        '0%': {

        },
        '100%': {

        }
    },
}))
