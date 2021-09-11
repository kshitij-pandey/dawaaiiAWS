import React from 'react'
import { makeStyles } from '@material-ui/core';
import InvoiceSuccess from '../layouts/cart/InvoiceSuccess';



const OrderedSuccess = () => {
    const classes = useStyle();

    return (
        <>
            <div className={classes.root}>
                <div>
                    <img src="./assets/images/CheckSuccees1.png" alt="" />
                    <h5>Your Order is Successfully Placed  🎉</h5>
                    {/* <p>Check your Whatsapp after 5 Mins to get order details</p> */}
                </div>
                {/* <InvoiceSuccess /> */}
            </div>
        </>
    )
}

export default OrderedSuccess;


const useStyle = makeStyles((theme) => ({
    root: {
        padding: '5rem',
        width: '709px',
        textAlign: 'center',

        display: 'flex',



        '& h5': {
            marginTop: '5rem',
            fontFamily: 'gilroyregular',
            fontSize: '25px',
            lineHeight: '60px',
            color: '#000',
        },
        '& p': {
            // marginTop: '1rem',
            fontFamily: 'gilroylight',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#000',
        },
    },

    [theme.breakpoints.down(600)]: {
        root: {
            width: 'auto',
            padding: '2rem 0',

            '& img': {
                width: '100px',
            },
            '& h5': {
                marginTop: '1rem',
            },
        },
    },

}))