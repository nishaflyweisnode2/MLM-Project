const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../Controller/privacyPolicyCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/privacy-policy', isAuthenticatedUser, privacyPolicyController.createPrivacyPolicy);
router.get('/privacy-policy', isAuthenticatedUser, privacyPolicyController.getCurrentPrivacyPolicy);
router.put('/privacy-policy', isAuthenticatedUser, privacyPolicyController.updatePrivacyPolicy);
router.delete('/privacy-policy', isAuthenticatedUser, privacyPolicyController.deletePrivacyPolicy);


module.exports = router;
