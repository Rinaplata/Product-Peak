const { body } = require("express-validator");

const createProductValidator = () => {
  return [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .isString()
      .withMessage("El nombre del producto es necesario"),
    body("description")
      .exists()
      .isString()
      .withMessage("Es necesario ponerle una descripcion al producto"),
    body("url")
      .exists()
      .isURL()
      .withMessage("Es necesario ponerle una URL al producto"),
    body("tags", "Es necesario que contenga almenos una etiqueta")
      .exists()
      .isArray(),
  ];
};

const modifyProductValidator = () => {
  return [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El nombre del producto es necesario"),
    body("description")
      .optional()
      .isString()
      .withMessage("Es necesario ponerle una descripcion al producto"),
    body("url")
      .optional()
      .isURL()
      .withMessage("Es necesario ponerle una URL al producto"),
    body("tags", "Es necesario que contenga almenos una etiqueta")
      .optional()
      .isArray(),
  ];
};

module.exports = { createProductValidator, modifyProductValidator };
