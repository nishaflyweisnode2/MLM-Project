const express = require('express');
const router = express.Router();
const chatController = require('../Controller/chatCtrl');

const { isAuthenticatedUser } = require("../Middleware/auth");


router.post('/chat', isAuthenticatedUser, chatController.createChat);
router.post('/chat/:chatId/message', isAuthenticatedUser, chatController.sendMessage);
router.get('/chat/:chatId/messages', isAuthenticatedUser, chatController.getChatMessages);


module.exports = router;
