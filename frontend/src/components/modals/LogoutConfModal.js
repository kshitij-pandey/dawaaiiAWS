import react, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/logoutConf.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const LogoutConfModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="my-logout-conf-modal"
            backdrop="static"
        >
            <Modal.Body>
                <div className="logout-container">
                    <div className="conf-text">
                        <img
                            src="./assets/images/logout_door.png"
                            alt="login thumb"
                            width="56px"
                            height="56px"
                        />
                        Are you sure you want to logout of your account?
                    </div>
                    <div className="conf-buttons">
                        <div className="button deny">
                            <button onClick={props.decisionreject}>
                                Cancel
                            </button>
                        </div>
                        <div className="button accept">
                            <button onClick={props.decisionaccept}>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LogoutConfModal;
