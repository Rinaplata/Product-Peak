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
 *     tags:
 *       - Products
 *     description: Crea un nuevo producto con los detalles proporcionados
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               url:
 *                 type: string
 *                 format: url
 *                 description: URL del producto
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Etiquetas del producto
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
/**
 * @swagger
 * /productos/{productId}:
 *   put:
 *     summary: Modificar un producto existente
 *     tags:
 *       - Products
 *     description: Modifica un producto existente con los detalles proporcionados
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del producto
 *               description:
 *                 type: string
 *                 description: Nueva descripción del producto
 *               url:
 *                 type: string
 *                 format: url
 *                 description: Nueva URL del producto
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Nuevas etiquetas del producto
 *     responses:
 *       '200':
 *         description: Producto modificado exitosamente
 *       '400':
 *         description: Solicitud incorrecta. Verifica el cuerpo de la solicitud para errores.
 *       '401':
 *         description: No autorizado. El usuario debe estar conectado para modificar un producto.
 *       '404':
 *         description: Producto no encontrado. El ID del producto proporcionado no existe.
 *       '500':
 *         description: Error interno del servidor. Algo salió mal en el servidor.
 */

router.put(
  "/:productId",
  verifyToken,
  modifyProductValidator(),
  reporterResult,
  modifyProduct
);
// Delete Product
/**
 * @swagger
 * /productos/{productId}:
 *   delete:
 *     summary: Eliminar un producto existente
 *     tags:
 *       - Products
 *     description: Elimina un producto existente según su ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto que se desea eliminar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo de la operación
 *                   example: Producto eliminado exitosamente
 *       '401':
 *         description: No autorizado. El usuario debe estar conectado para eliminar un producto.
 *       '404':
 *         description: Producto no encontrado. No se encontró un producto con el ID proporcionado.
 *       '500':
 *         description: Error interno del servidor. Algo salió mal en el servidor.
 */

router.delete("/:productId", verifyToken, reporterResult, deleteProduct);
// Find Product and get with Comments
/**
 * @swagger
 * /productos/{productId}:
 *   get:
 *     summary: Buscar un producto con comentarios
 *     tags:
 *       - Products
 *     description: Busca un producto existente según su ID y devuelve detalles del producto junto con sus comentarios asociados
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto que se desea buscar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Detalles del producto con comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo de la operación
 *                   example: Producto encontrado con éxito
 *                 product:
 *                   $ref: '#/components/schemas/ProductoConComentarios'
 *       '401':
 *         description: No autorizado. El usuario debe estar conectado para buscar un producto.
 *       '404':
 *         description: Producto no encontrado. No se encontró un producto con el ID proporcionado.
 *       '500':
 *         description: Error interno del servidor. Algo salió mal en el servidor.
 */

router.get("/:productId", verifyToken, reporterResult, findProductWithComment);

// Buscar productos por filtro
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Buscar productos con filtros
 *     tags:
 *       - Products
 *     description: Busca productos según los filtros especificados y devuelve una lista de resultados
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Categoría del producto a buscar
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del producto a buscar
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *         description: Calificación mínima del producto a buscar
 *     responses:
 *       '200':
 *         description: Lista de productos que coinciden con los filtros especificados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       '401':
 *         description: No autorizado. El usuario debe estar conectado para buscar productos.
 *       '500':
 *         description: Error interno del servidor. Algo salió mal en el servidor.
 */

router.get("", verifyToken, reporterResult, findProductWithParameters);

module.exports = router;
