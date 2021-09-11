import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import { addNumber } from '../../../../../redux/actions/order.action';



const AddNumber = (props) => {
    const classes = useStyle();
    const history = useHistory();

    const [number, setNumber] = useState('');
    const [checked, setChecked] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const submitNumber = () => {
        props.addNumber(number);
        history.push('/cart')
    }

    const changeNumber = (number) => {
        if (number.length < 11) {
            setNumber(number);
        }
    }
    const changeCheckbox = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        if (checked && number.length === 10) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }, [checked, number])

    return (
        <>
            <div className={classes.root}>
                <div className={classes.topNav}>
                    <Link to="/cart" >
                        <img width="20px" src="./assets/images/leftArrow.png" alt="" />
                    </Link>
                    <img src="./assets/images/Dawaai_logo.png" alt="" />
                </div>
                <div classes={classes.header} >
                    <div className={classes.title} >
                        <img width="35px" src="assets/images/whatsap2.png" alt="" />
                        <div className={classes.text} >
                            <h5>Add Number</h5>
                            <p>Get Started</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={classes.phone} >
                    <p>Enter Your Phone Number</p>
                    <div className={classes.input} >
                        <img src="assets/images/Vector.png" alt="" />
                        <input
                            style={{ width: '2rem' }}
                            type="text"
                            value="+91"
                            readOnly
                        />
                        <input
                            type="number"
                            value={number}
                            onChange={e => changeNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.submit}  >
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={e => changeCheckbox()}
                        />
                        I accept the Terms and Conditions
                    </label>
                    <button
                        disabled={btnDisabled}
                        // onClick={e => props.addNumber(number)} 
                        onClick={submitNumber}
                    >Add Number</button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { addNumber })(AddNumber);

const useStyle = makeStyles((theme) => ({
    root: {
        background: '#fff',
        height: '100vh',
    },
    topNav: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '.5rem',
        marginLeft: '1rem',
        '& img': {
            margin: '0 .5em',
        },
    },
    title: {
        marginLeft: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            marginRight: '1rem',
        },
    },
    text: {
        marginTop: '1rem',
        marginBottom: '1rem',
        '& h5': {
            fontFamily: 'gilroybold',
            fontSize: '22px',
            lineHeight: '30px',
        },
        '& p': {
            fontFamily: 'gilroylight',
            fontSize: '18px',
            lineHeight: '30px',
        },
    },
    phone: {
        padding: '1rem',
        '& p': {
            fontFamily: 'gilroyregular',
            fontSize: '15px',
            lineHeight: '30px',
            color: '#c4c4c4c'
        }
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '.6rem',
        padding: '.5rem',
        border: '1px solid gray',
        borderRadius: '5px',
        '& input': {
            fontFamily: 'gilroymedium',
            width: '100%',
            border: 'none',
            margin: '0 .5rem',
            height: '1rem',
            outline: 'none',
            fontSize: '20px',
        },
    },
    submit: {
        position: 'fixed',
        bottom: '0',
        width: '100%',
        '& button': {
            padding: '1rem',
            border: 'none',
            color: '#fff',
            // borderRadius: '50px',
            background: '#74B9F9',
            width: '100%',
            fontFamily: 'gilroymedium',
            fontSize: '20px',
            lineHeight: '30px',
            '&:disabled': {
                background: '#979797'
            },
        },
        '& label': {
            marginLeft: '1rem',
            fontFamily: 'gilroymedium',
            fontSize: '15px',
            lineHeight: '60px',
            color: '#979797',
            '& input': {
                marginRight: '.5rem',
            },
        },
    },
}));
