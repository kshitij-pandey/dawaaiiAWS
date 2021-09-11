import react, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/login.css";
import "../../styles/editProfileModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getUserDetails } from "../../redux/actions/Auth.action.js";
import { useHistory } from "react-router-dom";

const EditProfile = (props) => {
    const history = useHistory();
    const [numberNew, setNumberNew] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // alert("phone no inside edit profile component is: " + numberNew);
    }, [props.userPhoneNumber]);

    const url =
        window.location.host === "localhost:3000"
            ? "http://localhost:8000"
            : "";
    const [loading, setLoading] = useState(false);

    const updateUserProfile = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null);
        const validEmailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let name = document.getElementById("userName").value;
        // alert(name);
        // alert(typeof name);
        if (name.length <= 0 || !/^[a-zA-Z ]+$/.test(name)) {
            setError("Please enter a valid name...");
        } else {
            let email = document.getElementById("userMail").value;
            if (
                email.length <= 0 ||
                !validEmailRe.test(email)
            ) {
                setError("Please enter a valid email...");
            } else {
                let no = props.userPhoneNumber;
                // alert(`user details: name: ${name} and no: ${no} and email: ${email}`);
                const res = await fetch(
                    `${url}/auth/updateDetails`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: localStorage.getItem("Auth-token"),
                        },
                        body:{name:name,email:email}
                    }
                );
                const data = await res.json();
                
                if (res.status === 200) {
                window.location.reload();
                }
            }
        }
    };

    return (
        <Modal
            onExited={() => {
                // setError(null);
            }}
            dialogClassName="my-edit-profile-modal"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Body>
                <div className="edpro-con">
                    <div className="edpro-header">Edit Profile</div>
                    <form>
                        <div className="entry-field">
                            <div className="entry-label">
                                <div className="ast">*</div> Your Name
                            </div>
                            <div className="entry-input">
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    placeholder="e.g. Rahul Kumar"
                                    required
                                />
                            </div>
                        </div>
                        <div className="entry-field">
                            <div className="entry-label">
                                <div className="ast">*</div> Phone Number
                            </div>
                            <div className="entry-input">
                                <div className="ico">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                {props.userPhoneNumber && (
                                    <input
                                        type="number"
                                        name="userNo"
                                        id="userNo"
                                        readOnly
                                        value={props.userPhoneNumber.slice(3)}
                                        placeholder={props.userPhoneNumber.slice(
                                            3
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="entry-field">
                            <div className="entry-label">
                                <div className="ast">*</div> Email ID
                            </div>
                            <div className="entry-input">
                                <div className="ico">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input
                                    type="email"
                                    name="userMail"
                                    id="userMail"
                                    placeholder="e.g. example@gmail.com"
                                    required
                                />
                            </div>
                        </div>
                        {error && <div className="error-outer">{error}</div>}

                        <div className="updateButton">
                            <button
                                type="submit"
                                onClick={(e) => updateUserProfile(e)}
                                className="updateBtn bnt"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { getUserDetails })(EditProfile);
// export default EditProfile;
