const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../Controller/productCategoryCtrl");
const { isAuthenticatedUser } = require("../Middleware/auth");
const router = express.Router();
const upload = require("../Middleware/upload");



router.post("/", isAuthenticatedUser, upload.single("image"), createCategory);
router.put("/:id", isAuthenticatedUser, upload.single("image"), updateCategory);
router.delete("/:id", isAuthenticatedUser, deleteCategory);
router.get("/:id", isAuthenticatedUser, getCategory);
router.get("/", isAuthenticatedUser, getallCategory);

module.exports = router;
