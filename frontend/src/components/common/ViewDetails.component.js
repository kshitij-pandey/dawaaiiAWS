import React from 'react'
import { Button, makeStyles, withStyles } from '@material-ui/core';
export default function ViewDetails(props) {
    const storeWiseProducts=props.storeWiseProducts
    const classes = useStyles();
    return (
        <div style={{ width: '100%', }}>
        {storeWiseProducts.map(item => (
            
            <>
                <hr style={{ margin: '.5rem 0', color: '#8d8d8d' }} />
                <div className={classes.accDetailsRoot}>
                    <div className={classes.medName1}>
                        <p>{item.storeName}</p>
                    </div>
                    <div className={classes.medDetails} >
                        {item.products.map(product => (
                            <p><span>{product.productName} </span> <strong>Rs.{product.productPrice}</strong>  <span className={classes.quantity}>{product.quantity>1 ? `/for ${product.quantity} Tablets` : ""}</span> </p>

                        ))}

                    </div>
                </div>
            </>
        ))}
    </div>
    )
}


const useStyles = makeStyles((theme) => ({
    medName1: {
        width: '300px',
        paddingRight: '130px',
        display: 'flex',
        flexWrap: 'wrap',
        '& p': {
            // width: 'auto',
            padding: '.5rem 1.2rem',
            background: 'rgba(116, 185, 249, 0.35)',

            borderRadius: '5px',

            fontFamily: 'gilroymedium',
            fontSize: '15px',
            lineHeight: '30px',
            color: '#000',
        },
    },
    accDetailsRoot: {
        display: 'flex',

    },
    medDetails: {
        display: 'flex',
        flexWrap: 'wrap',
        '& p': {
            margin: '0 1rem',
            fontFamily: 'gilroyregular',
            fontSize: '15px',
            lineHeight: '40px',
            color: '#8d8d8d',

            '& strong': {
                color: '#000',
            },
            '& span': {
                color: '#000',
            },
        }
    },
    quantity:{
     color:"#000000",
     opacity:"69%"
    },
    [theme.breakpoints.down(600)]: {
        medName1: {
            width: '100%',
            textAlign: 'center',
            paddingRight: '0px',
            marginRight: '-1.5rem',
            display: 'block',
            '& p': {
                width: 'fit-content',
                padding: '0 .5rem',
                margin: '.5rem 0',
                fontSize: '12px',
                // lineHeight: '30px',
                // color: '#000',
            },
        },

        timePrice: {
            marginTop: '0rem',
            // marginBottom: '.5rem',
            '& h4': {
                fontSize: '14px',
                lineHeight: '14px',
            },
            '& p': {
                fontSize: '10px',
                lineHeight: '10px',
            },
        },
        addToCart: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',

            '& button': {
                width: '130px',
                fontSize: '12px',
                lineHeight: '20px',
            },
        },
        timeCart: {
            display: 'block',
            marginTop: '1rem',
            '& h4': {
                fontSize: '10px',
                lineHeight: '13px',
            },
            '& p': {
                fontSize: '7px',
                lineHeight: '12px',
            },
        },
        medDetails: {
            // flexGrow: ''
            '& p': {
                fontSize: '12px',
            },
        }
    }

}));
