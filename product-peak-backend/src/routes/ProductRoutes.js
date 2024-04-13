const { Router } = require("express");
const router = Router();

const {
  createProduct,
  modifyProduct,
  deleteProduct,
  findProductWithComment,
} = require("../controllers/ProductController");
const {
  createProductValidator,
  modifyProductValidator,
} = require("../validators/ProductValidator");
const { reporterResult } = require("../validators/ValidatorResult");
const verifyToken = require("../middlewares/authJWT");

// Create a new product
router.post(
  "",
  verifyToken,
  createProductValidator(),
  reporterResult,
  createProduct
);
// Modify Product
router.put(
  "/:productId",
  verifyToken,
  modifyProductValidator(),
  reporterResult,
  modifyProduct
);
// Delete Product
router.delete("/:productId", verifyToken, reporterResult, deleteProduct);
// Find Product and get with Comments
router.get("/:productId", verifyToken, reporterResult, findProductWithComment);

module.exports = router;
