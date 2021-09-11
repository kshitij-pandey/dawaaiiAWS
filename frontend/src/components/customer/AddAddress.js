import react, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/login.css";
// import "../../styles/editProfileModal.css";
import "../../../styles/addAddressModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getUserDetails } from "../../../redux/actions/Auth.action.js";
import { useHistory } from "react-router-dom";

const AddAddress = (props) => {
    const { getUserDetails, setPrefferedAddress, ...rest } = props;
    const history = useHistory();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("Auth-token")) {
            props.getUserDetails(localStorage.getItem("Auth-token"));
        }
        // alert("phone no inside edit profile component is: " + numberNew);
    }, []);

    const url =
        window.location.host === "localhost:3000"
            ? "http://localhost:4000"
            : "";
    const [loading, setLoading] = useState(false);

    const addAddress = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null);

        let buildingName = document.getElementById("buildingName").value;
        let street = document.getElementById("street").value;
        let locality = document.getElementById("locality").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let pincode = document.getElementById("pincode").value;
        if (
            buildingName.length <= 0 &&
            city.length <= 0 &&
            state.length <= 0 &&
            pincode.length !== 6
        ) {
            setError("Please fill in the required fields...");
        } else {
            let address = {
                buildingName,
                street,
                locality,
                city,
                state,
                pincode,
                addressString:
                    buildingName +
                    ", " +
                    street +
                    ", " +
                    locality +
                    ", " +
                    city +
                    ", " +
                    state +
                    " - " +
                    pincode,
            };
            const res = await fetch(`${url}/api/user/updateAddress`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("Auth-token"),
                    "Content-type": "Application/json",
                },
                body: JSON.stringify(address),
            });

            const data = await res.json();
            if (res.status === 200) {
                props.setPrefferedAddress(address.addressString);
                // history.push("/");
                props.onHide();
            }
        }
    };

    function limit(element, max_chars) {
        if (element.value.length > max_chars) {
            element.value = element.value.substr(0, max_chars);
        }
    }
    function minmax(value, min, max) {
        if (parseInt(value) < min || isNaN(parseInt(value))) return 0;
        else if (parseInt(value) > max) return 100;
        else return value;
    }

    return (
        <Modal
            onExited={() => {
                // setError(null);
            }}
            dialogClassName="my-add-address-modal"
            {...rest}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // backdrop="static"
        >
            <Modal.Body>
                <div className="add-con">
                    {/* <div className="add-header">Select Address</div>
                    {props.auth.user_address &&
                        props.auth.user_address.map((address) => (
                            <div className="entry-field">
                                <div className="entry-label">
                                    {address.addressString}
                                </div>
                                <div className="entry-input">
                                    {address.addressString}
                                </div>
                            </div>
                        ))} */}
                    <div className="add-header">Add Address</div>
                    <form>
                        <div className="entry-row">
                            <div className="entry-field">
                                <div className="entry-label">
                                    <div className="ast">*</div> Flat, Floor,
                                    Building Name
                                </div>
                                <div className="entry-input">
                                    <input
                                        type="text"
                                        name="buildingName"
                                        id="buildingName"
                                    />
                                </div>
                            </div>
                            <div className="entry-field">
                                <div className="entry-label">
                                    <div className="ast">*</div> Street Name
                                </div>
                                <div className="entry-input">
                                    <input
                                        type="text"
                                        name="street"
                                        id="street"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="entry-row">
                            <div className="entry-field">
                                <div className="entry-label">
                                    <div className="ast">*</div> Locality
                                </div>
                                <div className="entry-input">
                                    <input
                                        type="text"
                                        name="locality"
                                        id="locality"
                                    />
                                </div>
                            </div>
                            <div className="entry-field">
                                <div className="entry-label">
                                    <div className="ast">*</div> City
                                </div>
                                <div className="entry-input">
                                    <input type="text" name="city" id="city" />
                                </div>
                            </div>
                        </div>
                        <div className="entry-row">
                            <div className="entry-field">
                                <div className="entry-label">
                                    <div className="ast">*</div> State
                                </div>
                                <div className="entry-input">
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                    />
                                </div>
                            </div>
                            <div className="entry-field">
                                <div className="entry-label">
                                    <div className="ast">*</div> Pincode
                                </div>
                                <div className="entry-input">
                                    <input
                                        type="number"
                                        name="pincode"
                                        id="pincode"
                                        maxlength="6"
                                    />
                                </div>
                            </div>
                        </div>
                        {error && <div className="error-outer">{error}</div>}
                        <div className="updateButton">
                            <button
                                type="submit"
                                onClick={(e) => addAddress(e)}
                                className="updateBtn bnt"
                            >
                                Add Address
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

export default connect(mapStateToProps, { getUserDetails })(AddAddress);
// export default AddAddress;
