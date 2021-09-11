import React from 'react'
import { Button, withStyles } from '@material-ui/core';

const GeneralCustomButton = (props, { text }) => {
    return (
        <CustomButton >
            {props.text}
        </CustomButton>
    )
}

export default GeneralCustomButton

const CustomButton = withStyles({
    root: {
        color: '#fff',
        fontFamily: 'gilroymedium',
        fontSize: '15px',
        lineHeight: '40px',

        textTransform: 'none',
        // padding: '0 10px -2px 0px',
        padding: '.2rem 1.9rem',
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