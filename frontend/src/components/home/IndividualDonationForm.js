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

const IndividualDonationForm = (props) => {
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
                            name: "Dawaaii Individual Donation",
                            epilogue: { title: "Thanks You ! 🎉" },
                            clusters: [
                                {
                                    id: "db07357a7baacb52b9db4c13912addcf7c08d64c1fb2f06643582e141c6e5aa9",
                                    nodes: [
                                        {
                                            id: "2ac35cf664cf5b405d35f15ce5da25e5e860e9abbc703756d2174d3980c73b2d",
                                            name: "Hey ! We Just Need Few Details for Medicine Donation",
                                            nameVisible: true,
                                        },
                                        {
                                            id: "6cfaf46b0200fc5e5bce648fad545d60f633ba84056570de149819de37531eb3",
                                            name: "What is Your Name",
                                            nameVisible: true,
                                            slots: [
                                                {
                                                    id: "56c4b6301737709a590ecf92fab523ef803e2671518d19d6f213a28c1f05b668",
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
                                            id: "f0de77924b91fc4a8c1d4f1735dece6568ba728ae21354b8ccc0ae4b82cca0e2",
                                            name: "What is Your Mobile Number",
                                            nameVisible: true,
                                            slots: [
                                                {
                                                    id: "f4c5df8fee56c99c838052a9f67615e54b02ea9348b5584e36ebb1b9a3a2156b",
                                                    type: "numeric",
                                                    kind: "static",
                                                    reference: "number",
                                                    label: "Number",
                                                    required: true,
                                                    digits: 10,
                                                },
                                            ],
                                            block: {
                                                type: "tripetto-block-number",
                                                version: "7.0.2",
                                            },
                                        },
                                        {
                                            id: "bfd8533020f7f22604adcfcfcb99add306f495beac03e51280d85a0d7104cace",
                                            name: "What is Your Email Address",
                                            nameVisible: true,
                                            slots: [
                                                {
                                                    id: "48bd4fe10d45cb8372e94d7ff7e0563435cb0e79c8c75220742c5486a6d38765",
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
                                        {
                                            id: "c34ac009ab2a2df01be0584d1d9b49b8e28a44a2248401d473fbfce2a3e9e32e",
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
                                borderColor: "48BF91",
                            },
                            buttons: {
                                mode: "fill",
                                roundness: 5,
                                baseColor: "48BF91",
                                textColor: "fff",
                            },
                            background: {},
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

export default IndividualDonationForm;

// run({
//     element: document.body /* Or supply your own element here */,
//     definition: {
//         name: "Dawaaii Individual Donation",
//         epilogue: { title: "Thanks You ! 🎉" },
//         clusters: [
//             {
//                 id: "db07357a7baacb52b9db4c13912addcf7c08d64c1fb2f06643582e141c6e5aa9",
//                 nodes: [
//                     {
//                         id: "2ac35cf664cf5b405d35f15ce5da25e5e860e9abbc703756d2174d3980c73b2d",
//                         name: "Hey ! We Just Need Few Details for Medicine Donation",
//                         nameVisible: true,
//                     },
//                     {
//                         id: "6cfaf46b0200fc5e5bce648fad545d60f633ba84056570de149819de37531eb3",
//                         name: "What is Your Name",
//                         nameVisible: true,
//                         slots: [
//                             {
//                                 id: "56c4b6301737709a590ecf92fab523ef803e2671518d19d6f213a28c1f05b668",
//                                 type: "text",
//                                 kind: "static",
//                                 reference: "value",
//                                 label: "Text",
//                             },
//                         ],
//                         block: {
//                             type: "tripetto-block-text",
//                             version: "5.0.0",
//                         },
//                     },
//                     {
//                         id: "f0de77924b91fc4a8c1d4f1735dece6568ba728ae21354b8ccc0ae4b82cca0e2",
//                         name: "What is Your Mobile Number",
//                         nameVisible: true,
//                         slots: [
//                             {
//                                 id: "f4c5df8fee56c99c838052a9f67615e54b02ea9348b5584e36ebb1b9a3a2156b",
//                                 type: "numeric",
//                                 kind: "static",
//                                 reference: "number",
//                                 label: "Number",
//                             },
//                         ],
//                         block: {
//                             type: "tripetto-block-number",
//                             version: "7.0.2",
//                         },
//                     },
//                     {
//                         id: "bfd8533020f7f22604adcfcfcb99add306f495beac03e51280d85a0d7104cace",
//                         name: "What is Your Email Address",
//                         nameVisible: true,
//                         slots: [
//                             {
//                                 id: "48bd4fe10d45cb8372e94d7ff7e0563435cb0e79c8c75220742c5486a6d38765",
//                                 type: "string",
//                                 kind: "static",
//                                 reference: "email",
//                                 label: "Email address",
//                             },
//                         ],
//                         block: {
//                             type: "tripetto-block-email",
//                             version: "5.0.0",
//                         },
//                     },
//                 ],
//             },
//         ],
//         builder: { name: "tripetto", version: "4.2.3" },
//     },
//     l10n: {
//         contract: { name: "tripetto-runner-autoscroll", version: "5.1.6" },
//     },
//     onSubmit: (instance) => {
//         // TODO: Handle the results
//         // For example retrieve the results as a CSV-file:
//         const csv = Export.CSV(instance);
//         // Or retrieve the individual fields:
//         const fields = Export.fields(instance);
//     },
// });

// -----------------------------------------------------------------------

// run({
//     element: document.body, /* Or supply your own element here */
//     definition: {"name":"Dawaaii Individual Donation","epilogue":{"title":"Thanks You ! 🎉"},"clusters":[{"id":"db07357a7baacb52b9db4c13912addcf7c08d64c1fb2f06643582e141c6e5aa9","nodes":[{"id":"2ac35cf664cf5b405d35f15ce5da25e5e860e9abbc703756d2174d3980c73b2d","name":"Hey ! We Just Need Few Details for Medicine Donation","nameVisible":true},{"id":"6cfaf46b0200fc5e5bce648fad545d60f633ba84056570de149819de37531eb3","name":"What is Your Name","nameVisible":true,"slots":[{"id":"56c4b6301737709a590ecf92fab523ef803e2671518d19d6f213a28c1f05b668","type":"text","kind":"static","reference":"value","label":"Text","required":true}],"block":{"type":"tripetto-block-text","version":"5.0.0"}},{"id":"f0de77924b91fc4a8c1d4f1735dece6568ba728ae21354b8ccc0ae4b82cca0e2","name":"What is Your Mobile Number","nameVisible":true,"slots":[{"id":"f4c5df8fee56c99c838052a9f67615e54b02ea9348b5584e36ebb1b9a3a2156b","type":"numeric","kind":"static","reference":"number","label":"Number","required":true,"digits":10}],"block":{"type":"tripetto-block-number","version":"7.0.2"}},{"id":"bfd8533020f7f22604adcfcfcb99add306f495beac03e51280d85a0d7104cace","name":"What is Your Email Address","nameVisible":true,"slots":[{"id":"48bd4fe10d45cb8372e94d7ff7e0563435cb0e79c8c75220742c5486a6d38765","type":"string","kind":"static","reference":"email","label":"Email address","required":true}],"block":{"type":"tripetto-block-email","version":"5.0.0"}},{"id":"c34ac009ab2a2df01be0584d1d9b49b8e28a44a2248401d473fbfce2a3e9e32e"}]}],"builder":{"name":"tripetto","version":"4.2.3"}},
//     styles: {"direction":"vertical","verticalAlignment":"middle","hidePast":false,"hideUpcoming":false,"showNavigation":"auto","showProgressbar":true,"showEnumerators":false,"autoFocus":false,"showSeparateSubmit":true,"showPreviousButton":true,"hideRequiredIndicator":false,"showScrollbar":false,"disableScrolling":false,"noBranding":false,"contract":{"name":"tripetto-runner-autoscroll","version":"5.1.6"},"font":{"size":16,"family":"Poppins"},"inputs":{"borderSize":2,"roundness":5,"errorColor":"red","agreeColor":"green","declineColor":"red","borderColor":"48BF91"},"buttons":{"mode":"fill","roundness":5,"baseColor":"48BF91","textColor":"fff"},"background":{}},
//     l10n: {"contract":{"name":"tripetto-runner-autoscroll","version":"5.1.6"}},
//     onSubmit: (instance) => {
//         // TODO: Handle the results
//         // For example retrieve the results as a CSV-file:
//         const csv = Export.CSV(instance);
//         // Or retrieve the individual fields:
//         const fields = Export.fields(instance);
//     }
// });

// import { run } from "tripetto-runner-autoscroll";
// import { Export } from "tripetto-runner-foundation";

// run({
//     element: document.body, /* Or supply your own element here */
//     definition: {"name":"Dawaaii Individual Donation","epilogue":{"title":"Thanks You ! 🎉"},"clusters":[{"id":"db07357a7baacb52b9db4c13912addcf7c08d64c1fb2f06643582e141c6e5aa9","nodes":[{"id":"2ac35cf664cf5b405d35f15ce5da25e5e860e9abbc703756d2174d3980c73b2d","name":"Hey ! We Just Need Few Details for Medicine Donation","nameVisible":true},{"id":"6cfaf46b0200fc5e5bce648fad545d60f633ba84056570de149819de37531eb3","name":"What is Your Name","nameVisible":true,"slots":[{"id":"56c4b6301737709a590ecf92fab523ef803e2671518d19d6f213a28c1f05b668","type":"text","kind":"static","reference":"value","label":"Text","required":true}],"block":{"type":"tripetto-block-text","version":"5.0.0"}},{"id":"f0de77924b91fc4a8c1d4f1735dece6568ba728ae21354b8ccc0ae4b82cca0e2","name":"What is Your Mobile Number","nameVisible":true,"slots":[{"id":"f4c5df8fee56c99c838052a9f67615e54b02ea9348b5584e36ebb1b9a3a2156b","type":"numeric","kind":"static","reference":"number","label":"Number","required":true,"digits":10}],"block":{"type":"tripetto-block-number","version":"7.0.2"}},{"id":"bfd8533020f7f22604adcfcfcb99add306f495beac03e51280d85a0d7104cace","name":"What is Your Email Address","nameVisible":true,"slots":[{"id":"48bd4fe10d45cb8372e94d7ff7e0563435cb0e79c8c75220742c5486a6d38765","type":"string","kind":"static","reference":"email","label":"Email address","required":true}],"block":{"type":"tripetto-block-email","version":"5.0.0"}},{"id":"c34ac009ab2a2df01be0584d1d9b49b8e28a44a2248401d473fbfce2a3e9e32e"}]}],"builder":{"name":"tripetto","version":"4.2.3"}},
//     styles: {"direction":"vertical","verticalAlignment":"middle","hidePast":false,"hideUpcoming":false,"showNavigation":"auto","showProgressbar":true,"showEnumerators":false,"autoFocus":false,"showSeparateSubmit":true,"showPreviousButton":true,"hideRequiredIndicator":false,"showScrollbar":false,"disableScrolling":false,"noBranding":false,"contract":{"name":"tripetto-runner-autoscroll","version":"5.1.6"},"font":{"size":16,"family":"Poppins"},"inputs":{"borderSize":2,"roundness":5,"errorColor":"red","agreeColor":"green","declineColor":"red","borderColor":"48BF91"},"buttons":{"mode":"fill","roundness":5,"baseColor":"48BF91","textColor":"fff"},"background":{}},
//     l10n: {"contract":{"name":"tripetto-runner-autoscroll","version":"5.1.6"}},
//     onSubmit: (instance) => {
//         // TODO: Handle the results
//         // For example retrieve the results as a CSV-file:
//         const csv = Export.CSV(instance);
//         // Or retrieve the individual fields:
//         const fields = Export.fields(instance);
//     }
// });
