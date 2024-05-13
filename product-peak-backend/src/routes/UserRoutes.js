const { Router } = require("express");
const router = Router();

const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/UserController");
const {
  signUpValidator,
  logInValidator,
} = require("../validators/UserValidator");
const { reporterResult } = require("../validators/ValidatorResult");

/**
 * @swagger
 * /signUp:
 *   post:
 *     summary: Crear un nuevo usuario.
 *     description: Endpoint para crear un nuevo usuario.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Bad Request - Alguno de los campos requeridos no fue proporcionado o tiene un formato incorrecto.
 *       500:
 *         description: Error interno del servidor.
 */

// Create a new user
router.post("/signUp", [signUpValidator(), reporterResult], createUser);

// login

/**
 * @swagger
 * /logIn:
 *   post:
 *     summary: Iniciar sesión.
 *     description: Endpoint para que un usuario inicie sesión.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Se proporciona un token de acceso.
 *       400:
 *         description: Bad Request - Alguno de los campos requeridos no fue proporcionado o tiene un formato incorrecto.
 *       401:
 *         description: Unauthorized - Credenciales de inicio de sesión inválidas.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/logIn", [logInValidator(), reporterResult], loginUser);

router.get("/renew", renewToken);

module.exports = router;
