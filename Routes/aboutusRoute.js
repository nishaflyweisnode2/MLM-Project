const express = require('express');
const router = express.Router();
const aboutUsController = require('../Controller/aboutusCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/about-us', isAuthenticatedUser, aboutUsController.createAboutUs);
router.get('/about-us', isAuthenticatedUser, aboutUsController.getCurrentAboutUs);
router.put('/about-us', isAuthenticatedUser, aboutUsController.updateAboutUs);
router.delete('/about-us', isAuthenticatedUser, aboutUsController.deleteAboutUs);

module.exports = router;
