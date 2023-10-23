const express = require('express');
const router = express.Router();
const termsAndConditionsController = require('../Controller/term&conditionCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/terms-and-conditions', isAuthenticatedUser, termsAndConditionsController.createTermsAndConditions);
router.get('/terms-and-conditions', isAuthenticatedUser, termsAndConditionsController.getCurrentTermsAndConditions);
router.put('/terms-and-conditions', isAuthenticatedUser, termsAndConditionsController.updateTermsAndConditions);
router.delete('/terms-and-conditions', isAuthenticatedUser, termsAndConditionsController.deleteTermsAndConditions);



module.exports = router;
