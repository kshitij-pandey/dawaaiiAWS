const express = require('express');
const Auth = require('../controllers/auth.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ message: "Sahi kam kar raha hai sab auth ke andar."});
});

router.post('/login', Auth.login);

router.post('/verifyOTP', Auth.verifyOTP);

router.post("/verifyToken", Auth.verifyToken);

router.post('/updateDetails', Auth.updateDetails);

router.post('/updateAddress', Auth.updateAddress);

module.exports = router;

