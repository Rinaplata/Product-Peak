const { body } = require("express-validator");

const createRatingValidator = () => {
  return [
    body("productId")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Product id is mandatory"),
    body("rating")
      .not()
      .isEmpty()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating is mandatory"),
  ];
};

module.exports = { createRatingValidator };
