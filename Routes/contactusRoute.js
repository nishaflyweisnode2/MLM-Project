const express = require('express');
const router = express.Router();
const contactUsController = require('../Controller/contactusCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/contacts', isAuthenticatedUser, contactUsController.createContactUs);
router.get('/contacts', isAuthenticatedUser, contactUsController.getAllContacts);
router.get('/contacts/:id', isAuthenticatedUser, contactUsController.getContactById);
router.put('/contacts/:id', isAuthenticatedUser, contactUsController.updateContact);
router.delete('/contacts/:id', isAuthenticatedUser, contactUsController.deleteContact);

module.exports = router;
