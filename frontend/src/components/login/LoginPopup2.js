import react, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getUserDetails } from "../../redux/actions/Auth.action.js";
import { setToken } from "../../utils/Auth";
import { isAuthorized } from "../../utils/Auth";

const LoginPopup = (props) => {
    const url =
        window.location.host === "3.109.169.235"
            ? "http://localhost:8000"
            : process.env.PROD;
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [seconds, setSeconds] = useState(30);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [error, setError] = useState(null);
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        setError(null);
        if (isTimerActive) {
            seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
        }
    }, [isTimerActive, seconds]);

    localStorage.setItem("cart",JSON.stringify(props.order.cart))
  

    const pasteContent = (content, length) => {
        const inputs = document.querySelectorAll("#otp > *[id]");
        let i = 0;
        // alert(typeof Number.parseInt(content.charAt(i)));
        // alert(Number.parseInt(content.charAt(i)));
        // alert(content.charAt(i));
        while (length > 0 && i < 6) {
            let digit = content.charAt(i);
            digit = Number.parseInt(digit);
            // alert(`adding ${typeof digit} ${digit}`);
            inputs[i].value = digit;
            i++;
            length--;
        }
    };

    const sendOTP = async () => {
        setError(null);
        let no = document.getElementById("phoneno").value;
        let phone_con = document.getElementsByClassName("phone-container")[0];
        let outer_otp = document.getElementsByClassName("otp-outer")[0];
        let checked = document.getElementById("tnc").checked;
        let checked_mobile = document.getElementById("tnc_mobile").checked;
        let text = document.getElementsByClassName("tnc-inner")[0];
        let text1 = document.getElementsByClassName("tnc-inner")[1];
        let errorText = document.getElementsByClassName("error-outer");
        if (no.length !== 10) {
            // check if valid number
            outer_otp.style.display = "none";
            phone_con.style.borderColor = "red";
            setError("Please Enter Valid 10 digits Mobile number");
            // errorText.style.display = 'block';
            // alert(1);
        } else if (!checked && !checked_mobile) {
            // check if TnC accepted
            // alert('not checked');
            text.setAttribute("style", "font-style: italic");
            text.setAttribute("style", "color: red");
            text1.setAttribute("style", "font-style: italic");
            text1.setAttribute("style", "color: red");
            setError("Please accept the Terms and Conditions");
        } else {
            // OTP send to user
            setLoading(true);
            outer_otp.style.display = "block";
            phone_con.style.borderColor = "#a7d3fc";
            const inputs = document.querySelectorAll("#otp > *[id]");
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener("paste", (e) => {
                    let content = (
                        e.clipboardData || window.clipboardData
                    ).getData("text");
                    if (content.length > 6) {
                        content = content.substring(0, 6);
                    }
                    // content = Number.parseInt(content);
                    // alert(typeof content);
                    pasteContent(content, content.length);
                });
                inputs[i].addEventListener("keydown", (e) => {
                    var key = e.which || e.keyCode; // Detecting keyCode

                    // Detecting Ctrl
                    var ctrl = e.ctrlKey
                        ? e.ctrlKey
                        : key === 17
                        ? true
                        : false;

                    // If key pressed is V and if ctrl is true.
                    if (key == 86 && ctrl) {
                        // print in console.
                        // alert("Ctrl+V is pressed.");
                    }
                    // if (e.key === "Control" && e.key === "v") {
                    //     alert("tried pasting");
                    // }
                    else {
                        // alert(inputs[i].value);
                        if (e.key === "Backspace") {
                            inputs[i].value = "";
                            if (i !== 0) inputs[i - 1].focus();
                        } else if (e.key === "ArrowLeft" && i !== 0) {
                            inputs[i - 1].focus();
                        } else if (
                            e.key === "ArrowRight" &&
                            i !== inputs.length - 1
                        ) {
                            inputs[i + 1].focus();
                        } else if (
                            e.key != "ArrowLeft" &&
                            e.key != "ArrowRight" &&
                            ((e.keyCode > 95 && e.keyCode < 106) ||
                                (e.keyCode > 47 && e.keyCode < 58))
                        ) {
                            inputs[i].setAttribute("type", "text");
                            inputs[i].value = ""; // Bug Fix: allow user to change a random otp digit after pressing it
                            setTimeout(function () {
                                inputs[i].setAttribute("type", "password");
                            }, 1000); // Hides the text after 1 sec
                        }
                    }
                });

                inputs[i].addEventListener("input", function (e) {
                  
                    if (e.data >= 0 && e.data <= 9) {
                        // inputs[i].value = inputs[i].value.toUpperCase(); // Converts to Upper case. Remove .toUpperCase() if conversion isnt required.
                        if (i === inputs.length - 1 && inputs[i].value !== "") {
                            return true;
                        } else if (inputs[i].value !== "") {
                            inputs[i + 1].focus();
                        }
                    }
                });
            }
            // API call to send OTP
            const PhoneNumber =
                "+91" + document.getElementById("phoneno").value;
            const res = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNo: PhoneNumber }),
            });
          
            setSeconds(30); // reset timer for resend OTP
            document.getElementsByClassName(
                "resend-container"
            )[0].style.display = "flex";
            document.getElementsByClassName(
                "resend-container"
            )[0].style.cursor = "not-allowed";
            setIsTimerActive(true);
            setPhoneNumber(PhoneNumber);
            document.getElementById("verifyOTP").style.display = "block";
            document.getElementById("sendOTP").style.display = "none";
            document.getElementsByClassName("tnc")[0].style.display = "none";
            document.getElementsByClassName("tnc")[1].style.display = "none";
            if (res.status === 200 || res.status === 201) {
                document.getElementById("verifyOTP").style.display = "block";
                document.getElementById("sendOTP").style.display = "none";
                if (res.status === 201) setIsNewUser(true);
            } else {
                document.getElementById("phoneno").value = "";
                outer_otp.style.display = "none";
                phone_con.style.borderColor = "red";
            }

            setLoading(false);
            // alert(document.getElementById("phoneno").value);
        }
    };

    const verifyOTP = async () => {
        //verify OTP entered by user
        // alert('entering func');
        setError(null);
        let compiledOtp = "";
        for (let i = 0; i < 6; i++) {
            const no = document.getElementById(`OTP${i + 1}`).value;
            compiledOtp += no;
        }
        if (compiledOtp.length !== 6) {
            // OTP should be 6 digits long
            // alert('checking length');
            setError("OTP should be 6 digits long");
            // alert('checked func');
        } else {
            // alert('after checking length')
            // alert(typeof compiledOtp);
            // alert(compiledOtp);
            compiledOtp = Number.parseInt(compiledOtp);

            // alert(compiledOtp);
            // alert(typeof compiledOtp);
            // alert('b4 verifying otp')
         
            setLoading(true);
            // API call to check OTP
            const res = await fetch(`${url}/auth/verifyOTP`, {
                method: "POST",
                headers: {
                  
        'Content-Type': 'application/json',
        'Accept': 'application/json'
                },
                body: JSON.stringify({
                    phoneNo: phoneNumber,
                    OTP: compiledOtp,
                }),
            });
            const data = await res.json();
            console.log(data)
            if (res.status === 200) {
                setToken(data.token);
                const orderData={cart:localStorage.getItem("cart"),user:data.id}
               
                const res = await fetch(`${url}/order/saveCart`, {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json",
                    })
                    ,body:JSON.stringify(orderData)
                });

                props.getUserDetails(data.token);
                if (isNewUser) {
                    // check if new user
                    console.log("ye new user hai ")
                    props.showEditProfile(phoneNumber);
                    props.onHide();
                }
                   else{ window.location.reload();}
                
            } else {
                setError("Invalid or Expired OTP. Please Try Again");
            }
        }

        setLoading(false);
    };

    return (
        <Modal
            onExited={() => {
                setError(null);
            }}
            dialogClassName="my-modal"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="back-button">
                    <div
                        style={{ width: "50px", cursor: "pointer" }}
                        onClick={props.onHide}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                </div>
                <div className="login-container">
                    <div className="upper-con">
                        <div className="mobile-header">
                            <div className="thumb">
                                <img
                                    src="./assets/images/login_door.png"
                                    alt="login thumb"
                                    width="56px"
                                    height="62px"
                                />
                            </div>
                            <div className="mobile-friendly">
                                <div className="head">Sign in or Sign up</div>
                                <div className="text-parttwo">
                                    Get started with Dawaaii
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <div className="ast">*</div> Enter your phone number
                        </div>

                        <div
                            onClick={() => {
                                document.getElementById("phoneno").focus();
                            }}
                            className="phone-container"
                        >
                            <div className="phone-ico">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className="code">+91</div>
                            <div className="phone-no">
                                <input
                                    id="phoneno"
                                    type="number"
                                    placeholder="Mobile Number"
                                />
                            </div>
                        </div>

                        <div className="otp-outer">
                            <div className="text">
                                <div className="ast">*</div> Enter the OTP
                            </div>
                            <div className="otp-container">
                                <div class="mb-6 text-center">
                                    <div id="otp" class="flex justify-center">
                                        <input
                                            class="text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline"
                                            type="password"
                                            id="OTP1"
                                            maxlength="1"
                                        />
                                        <input
                                            class="text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline"
                                            type="password"
                                            id="OTP2"
                                            maxlength="1"
                                        />
                                        <input
                                            class="text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline"
                                            type="password"
                                            id="OTP3"
                                            maxlength="1"
                                        />
                                        <input
                                            class="text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline"
                                            type="password"
                                            id="OTP4"
                                            maxlength="1"
                                        />
                                        <input
                                            class="text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline"
                                            type="password"
                                            id="OTP5"
                                            maxlength="1"
                                        />
                                        <input
                                            class="text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline"
                                            type="password"
                                            id="OTP6"
                                            maxlength="1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {error && <div className="error-outer">{error}</div>}

                        <div className="tnc">
                            <div className="tnc-inner">
                                <input
                                    className="ckbox"
                                    type="checkbox"
                                    name="tnc"
                                    id="tnc"
                                />
                                <div>
                                    <b>I accept the Terms and Conditions </b>
                                </div>
                            </div>
                            <div className="tnc-link">View T&C</div>
                        </div>
                        <div
                            onClick={() => {
                                if (!(seconds > 0)) {
                                    // alert("we do something");
                                    sendOTP();
                                }
                            }}
                            style={{
                                cursor: seconds > 0 ? "not-allowed" : "pointer",
                            }}
                            className="resend-container"
                        >
                            Resend
                            {seconds ? (
                                seconds > 9 ? (
                                    <div className="time">00:{seconds}</div>
                                ) : (
                                    <div className="time">00:0{seconds}</div>
                                )
                            ) : // <div className="time">00:0{seconds}</div>
                            null}
                        </div>
                    </div>
                    <div className="lower-con">
                        <div className="overflow-wrapper">
                            <div className="mobile-footer">
                                <div className="tnc">
                                    <div className="tnc-inner">
                                        <input
                                            className="ckbox"
                                            type="checkbox"
                                            name="tnc"
                                            id="tnc_mobile"
                                        />
                                        <div>
                                            <b>
                                                I accept the Terms and
                                                Conditions{" "}
                                            </b>
                                        </div>
                                    </div>
                                    <div className="tnc-link">
                                        View T&C{" "}
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </div>
                            </div>
                            <div id="sendOTP" className="submit">
                                <button disabled={loading} onClick={sendOTP}>
                                    {" "}
                                    {loading ? (
                                        <>
                                            <FontAwesomeIcon
                                                className="spinner"
                                                icon={faSpinner}
                                            />
                                        </>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>
                            </div>
                            <div id="verifyOTP" className="submit">
                                <button disabled={loading} onClick={verifyOTP}>
                                    {" "}
                                    {loading ? (
                                        <>
                                            <FontAwesomeIcon
                                                className="spinner"
                                                icon={faSpinner}
                                            />
                                        </>
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    order:state.order
});

export default connect(mapStateToProps, { getUserDetails })(LoginPopup);
// export default LoginPopup;
