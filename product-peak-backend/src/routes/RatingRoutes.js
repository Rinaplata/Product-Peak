const { Router } = require("express");
const router = Router();

const verifyToken = require("../middlewares/authJWT");
const {
  createRating,
  getAllRating,
} = require("../controllers/RatingController");

const { createRatingValidator } = require("../validators/RatingValidator");

const { reporterResult } = require("../validators/ValidatorResult");

// Create a new Comment

/**
 * @swagger
 * /rating:
 *   post:
 *     summary: Crear una calificación de 1 a 5.
 *     description: Endpoint para calificar un producto en una escala del 1 al 5.
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto a calificar.
 *               userId:
 *                 type: string
 *                 description: ID del usuario que califica el producto.
 *               rating:
 *                 type: integer
 *                 description: Calificación del producto en una escala del 1 al 5.
 *     responses:
 *       201:
 *         description: Calificación creada exitosamente.
 *       400:
 *         description: Bad Request - Alguno de los campos requeridos no fue proporcionado o tiene un formato incorrecto.
 *       500:
 *         description: Error interno del servidor.
 */

router.post(
  "/rating",
  verifyToken,
  createRatingValidator(),
  reporterResult,
  createRating
);

/**
 * @swagger
 * /{productId}/rating:
 *   get:
 *     summary: Obtener todas las calificaciones de un producto.
 *     description: Endpoint para obtener todas las calificaciones de un producto específico.
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto del que se desean obtener las calificaciones.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Calificaciones del producto obtenidas exitosamente.
 *       404:
 *         description: Not Found - El producto especificado no fue encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/:productId/rating", verifyToken, getAllRating);

module.exports = router;
