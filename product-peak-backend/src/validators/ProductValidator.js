const { body } = require("express-validator");

const createProductValidator = () => {
  return [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El nombre del producto es necesario"),
    body("description")
      .exists()
      .withMessage("Es necesario ponerle una descripcion al producto"),
    body("url")
      .exists()
      .withMessage("Es necesario ponerle una URL al producto"),
    body("tags", "Es necesario que contenga almenos una etiqueta")
      .exists()
      .isArray(),
  ];
};

module.exports = { createProductValidator };
