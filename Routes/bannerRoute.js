const express = require('express');
const router = express.Router();
const bannerController = require('../Controller/bannerCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");

const upload = require("../Middleware/upload");



router.post('/banner', isAuthenticatedUser, upload.single("image"), bannerController.createBanner);
router.get('/banner', isAuthenticatedUser, bannerController.getAllBanners);
router.get('/banner/:id', isAuthenticatedUser, bannerController.getBannerById);
router.put('/banner/:id', isAuthenticatedUser, upload.single("image"), bannerController.updateBanner);
router.delete('/banner/:id', isAuthenticatedUser, bannerController.deleteBanner);


module.exports = router;
