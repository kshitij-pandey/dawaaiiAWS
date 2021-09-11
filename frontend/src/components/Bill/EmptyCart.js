import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

function EmptyCart() {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <img src="./assets/images/empty-cart.png" alt="" />
            <h1>Your cart is Empty</h1>
            <Link to="/" >
                <button className="goToShopping">Get Medicine</button>
            </Link>
        </div>
    )
}

export default EmptyCart


//style
const useStyle = makeStyles((theme) => ({
    root: {
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItem: 'center',
        textAlign: 'center',
        '& img': {
            margin: '0 auto',
            width: '20rem',
        },
        '& h1': {
            fontFamily: "gilroybold",
            fontSize: "40px",
            lineHeight: "46.88px",
            color: "#000",
        },
        '& button': {
            margin: '2rem auto',
            width: '15rem',

            background: '#48BF91',
            border: 'none',
            borderRadius: '10px',

            fontFamily: "gilroyregular",
            fontSize: "20px",
            lineHeight: "46.88px",
            color: "#fff",
        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            '& h1': {
                fontSize: "30px",
            },
            '& button': {
                width: '100%',
            },
        },
    },
}))