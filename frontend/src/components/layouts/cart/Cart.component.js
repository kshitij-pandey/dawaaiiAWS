import React from 'react'
import { makeStyles } from '@material-ui/core';
import CartItemList from './CartItemList'
import Invoice from './Invoice'
import InvoiceSuccess from './InvoiceSuccess';

const useStyle = makeStyles((theme) => ({
    root: {

    },
    [theme.breakpoints.down(600)]: {
        root: {
            textAlign: 'center',
            padding: '2rem 0'
        },
    },
}))

const Cart = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.root} >
            {props.success ?
                <InvoiceSuccess />
                // <></>
                :
                <>
                    <CartItemList />
                    <Invoice />
                </>

            }
        </div>
    )
}

export default Cart
