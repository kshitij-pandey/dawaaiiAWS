import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core';

import { increaseProductCount, decreaseProductCount, removeFromCart } from "../../../redux/actions/order.action";
import clsx from 'clsx';

const CartItemList = (props) => {
    const classes = useStyle();
    let medicals = []
    const { cart, loading } = props.order;
  
    const decreaseBtnClicked = (product) => {
        if (product.itemCount < 2) {
            props.removeFromCart(product.productID)
        }
        props.decreaseProductCount(product.productID)
    }


    let totalItem = cart && cart.length ? cart.length : 0;

    cart.map(medics => {
        if (!medicals.includes(medics.storeName)) {
            medicals.push(medics.storeName)
        }
    })

    let cartCart;
    if (cart === undefined || loading) {
        cartCart = (<h2>loading...</h2>)
    } else {
        if (cart.length > 0) {
            cartCart = cart.map(product => (
                <div className={clsx(classes.itemList, product.itemCount === 0 ? classes.zeroCountProduct : null)} >
                    <h2>{product.productName}</h2>
                    <div className={classes.itemCounter} >
                        <p onClick={e => decreaseBtnClicked(product)} style={{ color: '#B8B8B8', cursor: 'pointer' }} >-</p>
                        <p>{product.itemCount}</p>
                        <p onClick={e => props.increaseProductCount(product.productID)} style={{ color: '#B8B8B8', cursor: 'pointer' }} >+</p>
                    </div>
                    <p>&#x20B9; {product.productPrice * product.itemCount}</p>
                </div>
            ))
        }
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.title} >
                    <h1>Your Cart</h1>
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
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

export default connect(mapStateToProps, { increaseProductCount, decreaseProductCount, removeFromCart })(CartItemList)


//styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '409px',
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
            maxWidth: '340px',
            minWidth: '200px',
            padding: '2rem 1rem',
            // margin: '0 1rem',
            margin: 'auto',
            textAlign: 'center',
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
}));



