import { makeStyles } from "@material-ui/core";
import React from "react";
import { AutoscrollRunner } from "tripetto-runner-autoscroll";
import { useHistory } from "react-router-dom";
// import { ClassicRunner } from "tripetto-runner-classic";
import { Export } from "tripetto-runner-foundation";

// import NewNavbar from "../layouts/NewNavbar";
import Navbar from "../layouts/Navbar.layout";

const useStyle = makeStyles((theme) => ({
    root: {
        // position: 'relative',
    },
}));

const OrganizationDonationForm = (props) => {
    const history = useHistory();
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <Navbar showLogin={props.showLogin} />
            <div
                className="autoscroll-tripetto"
                style={{
                    width: "70%",
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    marginTop: "25px",
                    position: "relative",
                }}
            >
                <div
                    className="inner-con"
                    style={{ width: "100%", position: "absolute", top: "10px" }}
                >
                    <AutoscrollRunner
                        definition={{
                            name: "Organization Donation",
                            epilogue: {
                                title: "Thank You ! We will soon contact you. 🎉",
                            },
                            clusters: [
                                {
                                    id: "ec4dc0f4388019d14bce6d262a889e0d9282c34bfa4043a6e5489eb9da8d202a",
                                    nodes: [
                                        {
                                            id: "aa8d2022fbd57f17e0d79711af50f035a1c1db541dc2ae8fe29a8f0109f95ee6",
                                            name: "Hello ! We Just Need Few Details From You",
                                            nameVisible: true,
                                        },
                                        {
                                            id: "e7eafae04ca1b7b59b5e8ddbf12fd5bb9ea52fecb8dd10d61a0cd13be02d3c1d",
                                            name: "Name of Organization",
                                            nameVisible: true,
                                            slots: [
                                                {
                                                    id: "9404a05c77fd32416d5a60889fac69779f965444ee1feb44abca4a42857b9ad0",
                                                    type: "text",
                                                    kind: "static",
                                                    reference: "value",
                                                    label: "Text",
                                                    required: true,
                                                },
                                            ],
                                            block: {
                                                type: "tripetto-block-text",
                                                version: "5.0.0",
                                            },
                                        },
                                        {
                                            id: "3f70dc3185a1fa51fcff1ad349f5092f4a45ff097396891ee858dd7aee8d21fd",
                                            name: "Organization Phone Number",
                                            nameVisible: true,
                                            slots: [
                                                {
                                                    id: "953cd5c448512e65a4c6853e6bb2df06724c7a3576288f9a7baefa14028af344",
                                                    type: "string",
                                                    kind: "static",
                                                    reference: "phone-number",
                                                    label: "Phone number",
                                                    required: true,
                                                },
                                            ],
                                            block: {
                                                type: "tripetto-block-phone-number",
                                                version: "3.0.0",
                                            },
                                        },
                                        {
                                            id: "f3baa1e98eb68807ecec682a9e415e7ea7d927906ecf8cbc95fc2559f1da8d58",
                                            name: "Organization Email Address",
                                            nameVisible: true,
                                            slots: [
                                                {
                                                    id: "3c8cedfac67ae5d6e177824afbafabdf9fe1ce64a027367c41998c9a40cf1561",
                                                    type: "string",
                                                    kind: "static",
                                                    reference: "email",
                                                    label: "Email address",
                                                    required: true,
                                                },
                                            ],
                                            block: {
                                                type: "tripetto-block-email",
                                                version: "5.0.0",
                                            },
                                        },
                                    ],
                                },
                            ],
                            builder: { name: "tripetto", version: "4.2.3" },
                        }}
                        styles={{
                            direction: "vertical",
                            verticalAlignment: "middle",
                            hidePast: false,
                            hideUpcoming: false,
                            showNavigation: "auto",
                            showProgressbar: true,
                            showEnumerators: false,
                            autoFocus: false,
                            showSeparateSubmit: true,
                            showPreviousButton: true,
                            hideRequiredIndicator: false,
                            showScrollbar: false,
                            disableScrolling: false,
                            noBranding: false,
                            contract: {
                                name: "tripetto-runner-autoscroll",
                                version: "5.1.6",
                            },
                            font: { size: 16, family: "Poppins" },
                            inputs: {
                                borderSize: 2,
                                roundness: 5,
                                errorColor: "red",
                                agreeColor: "green",
                                declineColor: "red",
                            },
                            buttons: { mode: "fill", roundness: 5 },
                        }}
                        l10n={{
                            contract: {
                                name: "tripetto-runner-autoscroll",
                                version: "5.1.6",
                            },
                        }}
                        onSubmit={(instance) => {
                            console.dir(Export.exportables(instance));
                            setTimeout(() => {
                                history.push("/");
                            }, 2000);
                            // Implement your response handler here.

                            // For this example we output all exportable fields to the browser console

                            // Or output the data in CSV-format
                            // console.dir(Export.CSV(instance));
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrganizationDonationForm;
