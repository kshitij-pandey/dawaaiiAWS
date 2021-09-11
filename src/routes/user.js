const express = require('express');
// const {check} = require('express-validator');
// const multer = require('multer');
const User = require('../controllers/user.js');
// const validate = require('../middlewares/validate');
const router = express.Router();
// const upload = multer().single('profileImage');

router.post('/userDetails', User.userDetails);

router.get('/orderDetails', User.orderDetails);

router.put('/updateDetails', User.updateDetails);

router.post('/updateAddress', User.updateAddress);

// router.delete('/:id', User.destroy);

module.exports = router;