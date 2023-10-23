const express = require("express");
const router = express.Router();

router.use("/user", require("./distributorRoute"));
router.use("/product", require("./productRoute"));
router.use("/category", require("./productCategoryRoute"));
router.use("/order", require("./orderRoute"));
router.use("/sales", require("./SalesRoute"));
router.use("/coupon", require("./CouponRoute"));
router.use("/brand", require("./BrandRoute"));
router.use("/wallet", require("./WalletRoute"));
router.use("/contactus", require("./contactusRoute"));
router.use("/banner", require("./bannerRoute"));
router.use("/faq", require("./faqRoute"));
router.use("/privacyPolicy", require("./privacyPolicyRoute"));
router.use("/aboutus", require("./aboutusRoute"));
router.use("/termCondition", require("./term&conditionRoute"));
router.use("/chat", require("./chatroute"));

module.exports = router;