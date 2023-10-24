const express = require('express');
const router = express.Router();

const auth = require('../Controller/addressCtrl');


const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/user/address', isAuthenticatedUser, auth.createAddress);
router.put('/user/address/:addressId', isAuthenticatedUser, auth.updateAddress);
router.get('/user/address', isAuthenticatedUser, auth.getAddresses);
router.get('/user/address/:addressId', isAuthenticatedUser, auth.getAddressById);
router.delete('/user/address/:addressId', isAuthenticatedUser, auth.deleteAddress);


module.exports = router;
