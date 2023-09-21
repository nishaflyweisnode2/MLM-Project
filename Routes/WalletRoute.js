const express = require("express");
const router = express.Router();

const { addMoney, offerMoney } = require('../Controller/WalletCtrl');


router.post("/add-money/:userId", addMoney);
router.post("/offer-money", offerMoney);

module.exports = router;
