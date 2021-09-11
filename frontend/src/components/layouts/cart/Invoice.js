import React from 'react';
import { connect } from "react-redux";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';


const Invoice = (props) => {
    const classes = useStyle();

    const { cart } = props.order;

    let totalPrice = 0;
    cart.map(product => {
        totalPrice += +product.productPrice * product.itemCount;
    })

    return (
        <>
            <div className={classes.root} >
                <h1>Invoice</h1>
                <div className={classes.itemTotal} >
                    <p>Item total</p>
                    <p><span>&#x20B9; {totalPrice}</span></p>
                </div>
                <hr />
                <div className={classes.deliveryFee}>
                    <p>Delivery Fee</p>
                    <div className={classes.deliveryPrice} >
                        <p><strike>&#x20B9; 10</strike></p>
                        <p><span>Free</span></p>
                    </div>
                </div>
                <hr />
                <div className={classes.total} >
                    <p><span>To Pay</span></p>
                    <p><span>&#x20B9; {totalPrice}</span></p>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

export default connect(mapStateToProps, {})(Invoice)

//styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '409px',
        background: '#fff',
        padding: '1rem',
        marginLeft: '2rem',
        marginTop: '.5rem',

        borderRadius: '10px',
        '& h1': {
            fontFamily: 'gilroymedium',
            fontSize: '25px',
            lineHeight: '30px',
            color: '#000',
        },
    },
    itemTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '.5rem',
        marginBottom: '.5rem',
        // '& p': {
        fontFamily: 'gilroyregular',
        fontSize: '18px',
        lineHeight: '30px',
        color: '#908989',
        '& span': {
            color: '#000',
            fontWeight: 'bold',
        },
        // },
    },
    deliveryFee: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '.5rem',
        marginBottom: '.5rem',
        // '& p': {
        fontFamily: 'gilroyregular',
        fontSize: '18px',
        lineHeight: '30px',
        color: '#908989',
        '& span': {
            color: '#000',
            fontWeight: 'bold',
        },
    },
    deliveryPrice: {
        width: '6rem',
        display: 'flex',
        justifyContent: 'space-between',
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '.5rem',
        marginBottom: '.5rem',
        // '& p': {
        fontFamily: 'gilroyregular',
        fontSize: '18px',
        lineHeight: '30px',
        color: '#908989',
        '& span': {
            color: '#000',
            fontWeight: 'bold',
        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            maxWidth: '340px',
            minWidth: '200px',
            // background: '#fff',
            // padding: '1rem',
            // margin: '0 1rem',
            margin: 'auto',
            marginTop: '.5rem',

            // borderRadius: '10px',
            '& h1': {
                fontFamily: 'gilroymedium',
                fontSize: '25px',
                lineHeight: '30px',
                color: '#000',
            },
        },
    },
}));