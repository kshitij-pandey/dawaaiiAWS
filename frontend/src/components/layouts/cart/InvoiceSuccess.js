import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core';

import { increaseProductCount, decreaseProductCount, removeFromCart } from "../../../redux/actions/order.action";
import clsx from 'clsx';

const InvoiceSuccess = (props) => {
    const classes = useStyle();
    let medicals = []
    const { cart, loading, successInvoice } = props.order;

    let totalPrice = 0;
    successInvoice.map(product => {
        totalPrice += +product.productPrice * product.itemCount;
    })

    // const decreaseBtnClicked = (product) => {
    //     if (product.itemCount < 2) {
    //         props.removeFromCart(product.products._id)
    //     }
    //     props.decreaseProductCount(product.products._id)
    // }


    let totalItem = successInvoice && successInvoice.length ? successInvoice.length : 0;

    successInvoice.map(medics => {
        if (!medicals.includes(medics.storeName)) {
            medicals.push(medics.storeName)
        }
    })


    let cartCart;
    if (successInvoice === undefined || loading) {
        cartCart = (<h2>loading...</h2>)
    } else {
        if (successInvoice.length > 0) {
            cartCart = successInvoice.map(product => (
                <div className={clsx(classes.itemList, product.itemCount === 0 ? classes.zeroCountProduct : null)} >
                    <h2>{product.productName}</h2>
                    <div className={classes} >

                        <p style={{ margin: '0 2rem' }}>{product.itemCount}</p>
                    </div>
                    <p>₹{product.productPrice * product.itemCount}</p>
                </div>
            ))
        }
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.title} >
                    <h1>Invoice</h1>
                    <p>({totalItem} Items)</p>
                </div>
                <div className={classes.subTitle} >
                    <p>From
                        <span>
                            {medicals.map((medical, i) => (
                                ` ${medical}${(i + 1 === medicals.length) ? '' : ','}`
                            ))}
                        </span>
                    </p>
                </div>
                <hr />
                <div className={classes.listItems} >
                    {cartCart}
                </div>
                <hr style={{ height: '5px', color: '#000' }} />
                <div className={classes.itemTotal} >
                    <p>Item total</p>
                    <p><span>₹ {totalPrice}</span></p>
                </div>
                <hr />
                <div className={classes.deliveryFee}>
                    <p>Delivery Fee</p>
                    <div className={classes.deliveryPrice} >
                        <p><strike>₹ 10</strike></p>
                        <p><span>Free</span></p>
                    </div>
                </div>
                <hr />
                <div className={classes.total} >
                    <p><span>To Pay</span></p>
                    <p><span>₹ {totalPrice}</span></p>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

export default connect(mapStateToProps, { increaseProductCount, decreaseProductCount, removeFromCart })(InvoiceSuccess)


//styles
const useStyle = makeStyles((theme) => ({
    root: {
        // width: '409px',
        padding: '1rem 2rem',
        marginLeft: '2rem',
        background: '#fff',

        borderRadius: '10px',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& h1': {
            fontFamily: 'gilroybold',
            fontSize: '25px',
            lineHeight: '60px',
            color: '#000',
        },
        '& p': {
            fontFamily: 'gilroymedium',
            fontSize: '20px',
            lineHeight: '60px',
            color: '#000',
        },
    },
    subTitle: {
        '& p': {
            fontFamily: 'gilroymedium',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#000',

            '& span': {
                color: '#4CAF50'
            },
        },
        marginBottom: '1rem',
    },
    listItems: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    itemList: {
        margin: '1rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex: '0 1 auto',
        '& h2': {
            width: '10rem',
            fontFamily: 'gilroylight',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#000',
        },
        '& p': {
            margin: '0',
            fontFamily: 'gilroymedium',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#000',
        },
    },
    itemCounter: {
        width: '80px',
        height: '2rem',
        padding: '0 10px',
        display: 'flex',
        justifyContent: 'space-between',

        border: '1px solid #c4c4c4',
        borderRadius: '100px',
        '& p': {
            fontFamily: 'gilroymedium',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#000',
        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            // maxWidth: '340px',
            // minWidth: '100px',
            width: '50%',
            padding: '2rem',
            margin: '0 0rem',
            // marginLeft: '1rem',
            background: '#fff',

            borderRadius: '10px',
        },
        subTitle: {
            '& p': {
                fontSize: '15px',
            },
            // marginBottom: '1rem',
        },
        itemList: {
            '& h2': {
                width: '7rem',
                fontSize: '15px',
            },
            '& p': {
                fontSize: '15px',
            },
        },
        zeroCountProduct: {
            '& h2': {
                color: '#908989',
                textDecoration: 'line-through',
            },
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
            // maxWidth: '340px',
            // minWidth: '200px',
            // background: '#fff',
            // padding: '1rem',
            marginLeft: '0rem',
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



