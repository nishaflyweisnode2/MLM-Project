const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../Middleware/auth");

const { createWallet, getWallet, getAllWallets, getWalletTransactionsByDate } = require('../Controller/WalletCtrl');


router.post("/add-money/:userId", isAuthenticatedUser, createWallet);
router.get('/getWallet/:userId', isAuthenticatedUser, getWallet);
router.get('/', isAuthenticatedUser, getAllWallets);
router.get('/transactions', isAuthenticatedUser, getWalletTransactionsByDate);




module.exports = router;
