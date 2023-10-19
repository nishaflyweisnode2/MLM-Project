const express = require('express');
const router = express.Router();
const contactUsController = require('./contactUsController');


router.post('/contacts', contactUsController.createContactUs);
router.get('/contacts', contactUsController.getAllContacts);
router.get('/contacts/:id', contactUsController.getContactById);
router.delete('/contacts/:id', contactUsController.deleteContact);

module.exports = router;
