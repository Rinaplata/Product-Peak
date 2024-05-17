const { Router } = require("express");
const router = Router();

const {
  createProduct,
  modifyProduct,
  deleteProduct,
  findProductWithParameters,
  specificProduct,
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
// Fnf product with filters
router.get("", verifyToken, reporterResult, findProductWithParameters);
// Specific Products
router.get("/:productId", verifyToken, reporterResult, specificProduct);

module.exports = router;
