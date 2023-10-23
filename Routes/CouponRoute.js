const express = require("express");
const { isAuthenticatedUser } = require("../Middleware/auth");
const {
  createCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon

} = require("../Controller/CouponCtrl");
const router = express.Router();

router.post("/", isAuthenticatedUser, createCoupon);
router.get("/", isAuthenticatedUser, getAllCoupons);
router.get("/:id", isAuthenticatedUser, getCoupon);
router.put("/:id", isAuthenticatedUser, updateCoupon);
router.delete("/:id", isAuthenticatedUser, deleteCoupon);

module.exports = router;


