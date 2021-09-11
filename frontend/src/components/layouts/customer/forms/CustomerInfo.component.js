/**
 * Not edited to used
 * 
 * 
 */


import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import GeneralCustomButton from '../../../common/Button.common';

const useStyle = makeStyles((theme) => ({
    root: {
        background: '#F0F5F7',
        display: 'flex',
        justifyContent: 'center'
    },
    bullets: {
        textAlign: 'center',
        // flex: '1'
        // minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
        left: '2%',
        // margin: '-150px 0px 0px 150px',
    },
    vertical: {
        borderLeft: '2px solid black',
        height: '60px',
    },

    form: {
        // flex: '1',
    },

    card: {
        maxWidth: '800px',
        minWidth: '800px',
        margin: '1rem 0',
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
        },
        '& p': {
            fontFamily: 'gilroyregular',
            fontSize: '15px',
            lineHeight: '20px',
            color: '#000',

            maxWidth: '544px',
        },

        animationName: '$fadein',
        animationDuration: '1s',
        animationFillMode: 'forwards'
    },
    contactNumber: {
        width: '100%',
        marginTop: '1rem',
        marginBottom: '1rem',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        maxWidth: '420px',
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
            border: 'none',

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
    },

    '@keyframes fadein1': {
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 1
        }
    },
}))


const CustomerInfo = () => {
    const classes = useStyle();

    //State
    const [countryCode, setCountryCode] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [address, setAddress] = useState();

    //Active Card
    const [isAddNumberOpen, setIsAddNumberOpen] = useState(true);
    const [isAddDeliveryAddressOpen, setIsAddDeliveryAddressOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false);

    function printthis(e) {
        console.log(e);
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.bullets} >
                    <div className={classes.outerCircle}>
                        <div className={classes.innerCircle}>
                        </div>
                    </div>
                    <div className={classes.vertical}></div>

                    <div className={classes.outerCircle}>
                        <div className={classes.innerCircle}>
                        </div>
                    </div>

                    <div className={classes.vertical}></div>

                    <div className={classes.outerCircle}>
                        <div className={classes.innerCircle}>
                        </div>
                    </div>
                </div>

                <form className={classes.form} action="">
                    <div className={classes.card}>
                        <h1>Add Whatsapp Number</h1>
                        {isAddNumberOpen &&
                            <>
                                <p>Write your Whatsapp Number in the box below, we will send order confirmation and details on the provided numbr only</p>
                                <div className={classes.contactNumber}>
                                    <div className={classes.countryCode}>
                                        <img src="./assets/images/indiaFlag1.png" alt="" />
                                        <input
                                            value="+91"
                                            placeholder="Serach for medicine or a medical store"
                                            readOnly
                                        />
                                    </div>
                                    <div className={classes.inputField}  >
                                        <input
                                            value={mobileNumber}
                                            placeholder="Mobile Number"
                                            onChange={e => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="" onClick={e => printthis('okay')} >
                                    <GeneralCustomButton
                                        text={'Add Number'}
                                    />
                                </div>
                            </>
                        }
                    </div>
                    <div className={classes.card} >
                        <h1>Add Delivery Address</h1>
                        {isAddDeliveryAddressOpen &&
                            <><p>Write your delivery address in the box below</p>
                                <div className={classes.inputField} style={{ margin: '1rem 0' }}>


                                    <input
                                        value={address}
                                        placeholder="Type your address here"
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="" onClick={e => printthis('okay')} >
                                    <GeneralCustomButton
                                        text={'Add Address'}
                                    />
                                </div></>}
                    </div>
                    <div className={classes.card} >
                        <h1>Order</h1>
                        {isOrderOpen &&
                            <>
                                <p>Instruction: Isme batana hai ki aap whatsapp pe jayenge ek templated  msg k sath jo ki apko bhejna hoga</p>

                                <div style={{ marginTop: '1rem' }} onClick={e => printthis('okay')} >
                                    <GeneralCustomButton
                                        text={'Order'}
                                    />
                                </div>
                            </>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default CustomerInfo


