const { Router } = require("express");
const router = Router();

const { createProduct } = require("../controllers/ProductController");
const { createProductValidator } = require("../validators/ProductValidator");
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

module.exports = router;
