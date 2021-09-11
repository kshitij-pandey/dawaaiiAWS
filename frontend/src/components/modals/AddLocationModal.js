import react, { useState, useEffect, createRef } from "react";
import { makeStyles } from '@material-ui/core';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/LocationModal.css";
import Search from "../layouts/searchBar/Search.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const AddLocationModal = (props) => {
    const searchInput = createRef();
    const classes = useStyle();
    const [showModal, setShowModal] = useState(true);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="location-modal"
            backdrop="static"
            show={true}

        >
            <Modal.Body>
                <div className="location-container">
                    <div className="conf-text">
                        Address
                        <span onClick={() => props.setModal(false)}>&times;</span>
                    </div>
                    <div className="text">
                        Add the address where you want the medicine delivered
                    </div>
                    <div className={classes.search}>
                        <Search locationOnly={true} searchInput={props.searchInput} />
                        <div className="buttonAddLocation">
                            <button className="button accept" onClick={props.decisionaccept}>Add Location</button>
                        </div>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    );
};
const useStyle = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    logo: {
        marginTop: '1.5rem',
        marginBottom: '3rem',
        '& img': {
            width: '230px',
        },
    },
    paper: {
        width: "200px"
    },
    title: {
        // margin: '0 3rem',
        '& h1': {
            fontFamily: 'gilroybold',
            fontSize: '40px',
            lineHeight: '60px',
            color: 'rgba(49, 49, 49, 0.83)',
            '& strong': {
                color: '#48BF91',
            },
        },
        '& p': {
            marginTop: '1rem',
            fontFamily: 'gilroymedium',
            fontSize: '20px',
            lineHeight: '35px',
            color: 'rgba(49, 49, 49, 0.59)',
        },
    },
    search: {
        marginTop: '3rem',
    },
    contactType: {
        marginTop: '3rem',
        '& p': {
            fontFamily: 'gilroyregular',
            fontSize: '30px',
            lineHeight: '60px',
            color: '#000',
        }
    },
    contactLogo: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
    },
    call: {
        marginRight: '5rem',
        cursor: 'pointer',
        '& img': {
            // width: '70px',
            padding: '1rem',
            background: 'rgba(196, 196, 196, 0.27)',
            borderRadius: '5px',
        }
    },
    vertical: {
        borderLeft: '2px solid black',
        height: '60px',

    },
    whatsapp: {
        // borderLeft: '1px solid #000',
        marginLeft: '5rem',
        cursor: 'pointer',
        '& img': {
            // width: '50px',
            padding: '1rem',
            background: 'rgba(196, 196, 196, 0.27)',
            borderRadius: '5px',
        }
    },
    services: {
        display: 'flex',
        justifyContent: 'center',
        flex: '1 1 1',
        margin: '5rem 3rem',
    },
    service: {
        margin: '2rem',
        padding: '1rem',
        flexGrow: '1',
        flexBasis: '0',
        '& h1': {
            margin: '1rem',
            fontFamily: 'gilroybold',
            fontSize: '30px',
            lineHeight: '35.16px',
            color: '#000',
        },
        '& p': {
            fontFamily: 'gilroylight',
            fontSize: '28px',
            lineHeight: '32.81px',
            color: '#000',
        },
    },
    [theme.breakpoints.down(600)]: {
        logo: {
            marginTop: '1rem',
            marginBottom: '2rem',
            '& img': {
                width: '150px',
            },
        },
        title: {
            '& h1': {
                fontSize: '30px',
                lineHeight: '40px',
            },
            '& p': {
                fontSize: '17px',
                lineHeight: '25px',
            },
        },
        contactType: {
            margin: '2rem 1rem',
            '& p': {
                fontSize: '25px',
                lineHeight: '40px',
            }
        },
        call: {
            marginRight: '3rem',
            '& p': {
                fontSize: '20px',
            },
        },
        whatsapp: {
            marginLeft: '3rem',
            '& p': {
                fontSize: '20px',
            },
        },
        services: {
            flexDirection: 'column',
            margin: '1rem 1rem',
        },
        service: {
            margin: '0',
            marginTop: '3rem',
            marginBottom: '3rem',
            padding: '0',
            '& h1': {
                fontSize: '25px',
            },
            '& p': {
                fontSize: '24px',
            },
        },
    }
}))

export default AddLocationModal;
