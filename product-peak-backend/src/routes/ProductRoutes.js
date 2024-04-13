const { Router } = require("express");
const router = Router();

const {
  createProduct,
  modifyProduct,
  deleteProduct,
  findProductWithComment,
  findProductWithParameters,
} = require("../controllers/ProductController");
const {
  createProductValidator,
  modifyProductValidator,
} = require("../validators/ProductValidator");
const { reporterResult } = require("../validators/ValidatorResult");
const verifyToken = require("../middlewares/authJWT");

// Create a new product
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     description: Crea un nuevo producto con los detalles proporcionados
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InputProducto'
 *     responses:
 *       '200':
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       '400':
 *         description: Solicitud incorrecta. Verifica el cuerpo de la solicitud para errores.
 *       '401':
 *         description: No autorizado. El usuario debe estar conectado para crear un producto.
 *       '500':
 *         description: Error interno del servidor. Algo salió mal en el servidor.
 */

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
// Fnf product with filters
router.get("", verifyToken, reporterResult, findProductWithParameters);

module.exports = router;
