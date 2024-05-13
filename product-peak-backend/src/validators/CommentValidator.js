const { body } = require("express-validator");

const createCommentValidator = () => {
  return [
    body("productId", "Product id is mandatory").not().isEmpty(),
    body("content", "Content is mandatory").not().isEmpty(),
  ];
};

module.exports = { createCommentValidator };
