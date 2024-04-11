const { body } = require("express-validator");

const createProductValidator = () => {
  return [
    body("name").exists().withMessage("El nombre del producto es necesario"),
    body("description")
      .exists()
      .withMessage("Es necesario ponerle una descripcion al producto"),
    body("url")
      .exists()
      .withMessage("Es necesario ponerle una URL al producto"),
    body("tags", "Es necesario que contenga almenos una etiqueta").exists(),
  ];
};

module.exports = { createProductValidator };
