const { Router } = require('express');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/UserController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

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
router.post(
  '/signUp', 
  [
    check('username', 'Username is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password min length is 6').isLength({ min: 6 }),
    check('bio', 'Bio min length is 1000').isLength({ max: 1000 }),
    check('avatar', 'Avatar is mandatory').not().isEmpty(),
    validateFields
  ],
  createUser
);

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
router.post(
  '/logIn', 
  [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateFields
  ],
  loginUser
);

router.get('/renew', renewToken);

module.exports = router;
