const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  getProductByCategory,
  updateProduct,
  deleteProduct,
  addToWishlist,
  getLatestProduct,
  rateProduct,
  getProductRatings,
  getProductRatingByUser,
  updateRating,
  deleteRating
} = require("../Controller/productCtrl");
const { isAuthenticatedUser } = require("../Middleware/auth");

const router = express.Router();

const upload = require("../Middleware/upload");



router.post("/", isAuthenticatedUser, upload.array("image"), createProduct);
router.get("/:id", isAuthenticatedUser, getaProduct);
router.get("/products/by-category/:categoryId", getProductByCategory);
router.get("/", isAuthenticatedUser, getAllProduct);
router.put("/:id", isAuthenticatedUser, upload.array("image"), updateProduct);
router.delete("/:id", isAuthenticatedUser, deleteProduct);
router.delete("/:id", isAuthenticatedUser, deleteProduct);
router.put("/wishlist/:_id", isAuthenticatedUser, addToWishlist);
router.get('/latest/product', isAuthenticatedUser, getLatestProduct);
router.post('/:productId/rate', isAuthenticatedUser, rateProduct);
router.get('/:productId/ratings', isAuthenticatedUser, getProductRatings);
router.get('/:productId/ratings/user', isAuthenticatedUser, getProductRatingByUser);
router.put('/:productId/rate', isAuthenticatedUser, updateRating);
router.delete('/:productId/rate', isAuthenticatedUser, deleteRating);




module.exports = router;

