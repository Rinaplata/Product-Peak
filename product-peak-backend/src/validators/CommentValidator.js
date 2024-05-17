const { body } = require("express-validator");

const createCommentValidator = () => {
  return [
    body("productId")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Product id is mandatory"),
    body("content").not().isEmpty().withMessage("Content is mandatory"),
  ];
};

module.exports = { createCommentValidator };
