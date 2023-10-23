const express = require('express');
const router = express.Router();
const faqController = require('../Controller/faqCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/faqs', isAuthenticatedUser, faqController.createFAQ);
router.get('/faqs', isAuthenticatedUser, faqController.getAllFAQs);
router.put('/faqs/:id', isAuthenticatedUser, faqController.updateFAQ);
router.delete('/faqs/:id', isAuthenticatedUser, faqController.deleteFAQ);

module.exports = router;
