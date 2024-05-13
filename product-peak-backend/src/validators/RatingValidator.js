const { body } = require("express-validator");

const createRatingValidator = () => {
  return [
    body("productId", "Product id is mandatory").not().isEmpty(),
    body("rating", "rating is mandatory")
      .not()
      .isEmpty()
      .isInt({ min: 1, max: 5 }),
  ];
};

module.exports = { createRatingValidator };
