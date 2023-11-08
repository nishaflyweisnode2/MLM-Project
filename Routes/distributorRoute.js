const express = require("express");
const {
  createUser,
  loginUser,
  socialLogin,
  getallUser,
  getaUser,
  deleteaUser,
  UpdateUser,
  UploadUserProfile,
  UserCart,
  getUserCart,
  emptyCart,
  addTeammateDistributor,
  applyCoupon,
  getTeamMembers,
  AddTeamMemberByDistributor,
  getTeamMembersCount,
  verifyOtp,
  ForgetPassword,
  resetPasswordOTP,
  resendOtp,
  leader,
  getleader,
  childBranches,
  getdownline,
  distributorKutumbh,
  kutumbhMembers,
  kutumbhAvailable,
  kutumbhTree,
  generateIDCard,
  searchProducts,
  getTotalMembersInKutumb,
  getTotalActiveMembers,
  addBankDetails,
  updateBankDetails,
  getBankDetails,
  deleteBankDetails

} = require("../Controller/distributorCtrl");
const { isAuthenticatedUser } = require("../Middleware/auth");
const router = express.Router();

const upload = require("../Middleware/upload");


router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/otp/verify/:id", /* isAuthenticatedUser, */ verifyOtp);
router.post("/user/socialLogin", /*isAuthenticatedUser,*/ socialLogin);
router.post("/forget", /* isAuthenticatedUser, */ ForgetPassword);
router.post("/reset", /*isAuthenticatedUser,*/ resetPasswordOTP);
router.get("/resend/otp/:id", resendOtp);
router.get("/all-users", getallUser);
router.get("/:id", isAuthenticatedUser, getaUser);
router.put("/update", isAuthenticatedUser, UpdateUser);
router.put("/updateProfilePic", isAuthenticatedUser, upload.single("image"), UploadUserProfile);
router.delete("/:id", isAuthenticatedUser, deleteaUser);
router.post("/cart", isAuthenticatedUser, UserCart);
router.get("/getcart/user", isAuthenticatedUser, getUserCart);
router.get("/empty-cart/user", isAuthenticatedUser, emptyCart);
router.post("/add/teammembers", isAuthenticatedUser, addTeammateDistributor);
router.get("/teammembers/:parentId", isAuthenticatedUser, getTeamMembers);
router.post("/cart/applycoupon", isAuthenticatedUser, applyCoupon);
router.post("/:id/teammember", isAuthenticatedUser, AddTeamMemberByDistributor);
router.get("/:id/teammember", isAuthenticatedUser, getTeamMembersCount);
router.post('/determine-leader', isAuthenticatedUser, leader);
router.get('/distributor/:userId', isAuthenticatedUser, getleader);
router.get("/:distributorId/child", isAuthenticatedUser, childBranches);
router.get("/:id/downline", isAuthenticatedUser, getdownline);
router.get("/distributor/kutumbh/count", isAuthenticatedUser, distributorKutumbh)
router.get("/kutumbh-members/:distributorId", isAuthenticatedUser, kutumbhMembers)
router.get("/available-kutumbhs/:distributorId", isAuthenticatedUser, kutumbhAvailable)
router.get("/tree-height-depth/:distributorId", isAuthenticatedUser, kutumbhTree)
router.get('/user/idcard/:userId', isAuthenticatedUser, generateIDCard);
router.get('/search-products/get', isAuthenticatedUser, searchProducts);
router.get('/total-members-in-kutumb/:userId', isAuthenticatedUser, getTotalMembersInKutumb);
router.get('/totalActiveMembers/get', isAuthenticatedUser, getTotalActiveMembers);
router.post("/bank/add/:id", /*isAuthenticatedUser,*/ addBankDetails);
router.put("/bank/update/:userId", isAuthenticatedUser, updateBankDetails);
router.get("/bank/get", isAuthenticatedUser, getBankDetails);
router.delete("/bank/delete", isAuthenticatedUser, deleteBankDetails);






module.exports = router;
