const express = require('express');
const router = express.Router();

const {
    createNotification,
    markNotificationAsRead,
    getNotificationsForUser,
} = require('../Controller/notificationCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/notifications', isAuthenticatedUser, createNotification);
router.put('/notifications/:notificationId', isAuthenticatedUser, markNotificationAsRead);
router.get('/notifications/user/:userId', isAuthenticatedUser, getNotificationsForUser);

module.exports = router;
