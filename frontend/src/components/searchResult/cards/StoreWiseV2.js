import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, makeStyles, withStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import { addProductToCart, removeFromCart } from '../../../redux/actions/order.action';
import { grey } from '@material-ui/core/colors';
import ViewDetails from '../../common/ViewDetails.component';
import { formatePack } from '../../../utils/storeWiseProducts';
const StoreWiseV2 = (props) => {
    const classes = useStyles();
    const [count, setCount] = useState(0)
    const { pack } = props;
    // let price = pack.price
    const [isAdded, setIsAdded] = useState(false)
   let newArray=[]
    if(pack && pack.products ){newArray=formatePack(pack)}
    console.log("new Format is ",newArray,pack)


    let medIds = []
    newArray.map((store, i) => {
        store.products.map(med => {
            console.log('setting meids');
            medIds.push(med.productID)
        })
    })
    const { cart } = props.order;

    useEffect(() => {
        if (cart.length > 0) {
        
            medIds.map(medid => {
                cart.map(prod => {

                    if (isAdded) {
                        console.log('isAdded true');
                        if (medid === prod.productID) {
                            console.log('setting true');
                            setIsAdded(true);
                        } else {
                            console.log('setting false');
                            setIsAdded(false);
                        }
                        if (count <= medIds.length) {
                            setCount(count + 1)
                        }
                    } else {
                        console.log('isAdded false');
                    }
                })
            })
        } else {
            setIsAdded(false)
        }
        console.log(count)
    }, [count])
   useEffect(()=>{
  console.log()
   },[props.cart])

    function addPackageToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(newArray);
        setIsAdded(true)
        newArray.map(store => {
            store.products.map(product => {
                let obj = {}
                obj.storeID= store.storeID;
                obj.city = store.city;
                obj.cluster=store.cluster;
                obj.storeName = store.storeName;
                obj.itemCount = 1;
                obj.productName = product.productName;
                obj.productID = product.productID;
                obj.productPrice = product.productPrice;
                obj.productDiscount = '0';
                props.addProductToCart(obj);
                console.log(obj);
            })
        })
    }

    function removeFromCart(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsAdded(false)
        newArray.map(store => {
            store.products.map(product => {
                let obj = {}
                obj.storeID = store.storeID;
                obj.city = store.city;
                obj.cluster=store.cluster
                obj.storeName = store.storeName;
                obj.itemCount = 1;
                obj.productName = product.productName;
                obj.productID = product.productID;
                obj.productPrice = product.productPrice;
                obj.productDiscount = '0';
                props.removeFromCart(obj);
                console.log(obj);
            })
        })
    }


    console.log('renderd');
    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div
                        className={classes.item}>
                        <div className={classes.medName}>
                            {newArray.map(store => (
                                <p>{store.storeName}</p>
                            ))}
    
                        </div>
                        <div className={clsx(classes.time, classes.timePrice)}>
                            <h4>Tommorow 9: 00 PM</h4>
                            <p>Exprected Delivery Time: </p>
                        </div> 
                        <div className={clsx(classes.price, classes.timePrice)}>
                            <h4>Rs.{pack.price}</h4>
                            <p>View Details</p>
                        </div>
                        <div className={classes.addToCart} >
                            <div style={{ textAlign: 'center' }}>
                                {isAdded ? (
                                    <AddedBtn onClick={e =>
                                        // removeFromCart('item.products._id')
                                        removeFromCart(e)
                                        // setIsAdded(false)
                                    }>
                                        Added to cart
                                    </AddedBtn>
                                ) : (
                                    <NotAddedBtn
                                        onClick={e => addPackageToCart(e)}
                                    >
                                        Add to Cart
                                    </NotAddedBtn>
                                )}
                            </div>
                            {/* <div className={clsx(classes.timeCart, classes.timePrice)}>
                                <h4>Tommorow 9:00 PM</h4>
                                <p>Exprected Delivery Time:</p>
                            </div> */}
                        </div>
                    </div>
                </AccordionSummary>
                {/* <hr /> */}
                <AccordionDetails>

    <ViewDetails storeWiseProducts={newArray} />

                </AccordionDetails>
            </Accordion>
        </div >
    );
}

const mapStateToProps = state => ({
    order: state.order
})

export default connect(mapStateToProps, { addProductToCart, removeFromCart })(StoreWiseV2)



const NotAddedBtn = withStyles({
    root: {
        width: '100%',
        textTransform: 'none',
        padding: '.3rem 1.7rem',
        background: '#F36D31',
        marginTop: '0px',
        marginBottom: '-2px',
        '&:hover': {
            marginTop: '-2px',
            marginBottom: '0px',
            backgroundColor: '#F36D31',
            boxShadow: '0px 10px 9px -5px rgba(0,0,0,0.75)',
        },
    }
})(Button);

const AddedBtn = withStyles({
    root: {
        width: '100%',
        textTransform: 'none',
        padding: '.3rem 1rem',
        background: '#4CAF50',
        marginTop: '0px',
        marginBottom: '-2px',
        '&:hover': {
            marginTop: '-2px',
            marginBottom: '0px',
            background: '#4CAF50',
            boxShadow: '0px 10px 9px -5px rgba(0,0,0,0.75)',
        },
    }
})(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        // margin: '5rem 3rem',
        // marginBottom: "8rem",
        // '& h1': {
        //     fontFamily: 'gilroyregular',
        //     fontSize: '25px',
        //     lineHeight: '60px',
        //     color: '#000',
        // },
        margin: '1rem 0',

        border: '1px solid #000',
        borderRadius: '7px',

    },
    item: {
        width: '100%',
        margin: '0rem 0rem',
        padding: '0',

        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexGrow: 'auto 1 1 1',

        // border: '1px solid #000',
        // borderRadius: '7px',
    },
    medName: {
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
    time: {
        display: 'block',
    },
    price: {
        // flex: '.5',
    },
    timePrice: {
        textAlign: 'center',
        '& h4': {
            margin: '.5rem 0',
            fontFamily: 'gilroybold',
            fontSize: '18px',
            lineHeight: '30px',
            color: '#000',
        },
        '& p': {
            margin: '.5rem 0',
            fontFamily: 'gilroylight',
            fontSize: '14px',
            lineHeight: '30px',
            color: '#000',
        },
    },
    timeCart: {
        display: 'none',
    },
    addToCart: {

        '& button': {
            border: 'none',
            borderRadius: '5px',

            fontFamily: 'gilroyregular',
            fontSize: '18px',
            lineHeight: '40px',
            color: '#fff',
            cursor: 'pointer',

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
        root: {
            // margin: '5rem 1rem',
            '& h1': {
                fontSize: '20px',
                lineHeight: '30px',
            },
        },
        item: {
            // flexDirection: 'column',
            alignItems: 'baseline',
            marginLeft: '7px',
        },
        medName: {
            width: '100%',
            textAlign: 'center',
            paddingRight: '0px',
            marginRight: '-1.5rem',
            '& p': {
                // width: 'auto',
                padding: '0 .5rem',
                margin: '.5rem 0',
                fontSize: '12px',
                // lineHeight: '30px',
                // color: '#000',
            },
        },
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
        time: {
            display: 'none',
        },
        price: {
            width: '150px',
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