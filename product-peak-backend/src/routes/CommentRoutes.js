const { Router } = require('express');
const router = Router();


const { createComment, getAllComment  } = require('../controllers/CommentController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

// Create a new Comment 
/**
* @swagger
* /comment:
*   post:
*     summary: Crear un comentario sobre un producto.
*     description: Endpoint para que los usuarios puedan dejar un comentario sobre un producto.
*     tags: [comments]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               productId:
*                 type: string
*               userId:
*                 type: string
*               content:
*                 type: string
*     responses:
*       201:
*         description: Comentario creado exitosamente.
*       400:
*         description: Bad Request - Alguno de los campos requeridos no fue proporcionado o tiene un formato incorrecto.
*       500:
*         description: Error interno del servidor.
*/

router.post(
    '/comment', 
    [
      check('productId', 'Product id is mandatory').not().isEmpty(),
      check('userId', 'User id is mandatory').not().isEmpty(),
      check('content', 'Content is mandatory').not().isEmpty(),
      validateFields
    ],
    createComment
  );

  /**
* @swagger
* /comment/{productId}:
*   get:
*     summary: Obtener todos los comentarios de un producto.
*     description: Endpoint para obtener todos los comentarios de un producto específico.
*     tags: [comments]
*     parameters:
*       - in: path
*         name: productId
*         schema:
*           type: string
*         required: true
*         description: ID del producto del que se desean obtener los comentarios.
*     responses:
*       200:
*         description: Lista de comentarios obtenida exitosamente.
*       400:
*         description: Bad Request - El ID del producto proporcionado es inválido.
*       404:
*         description: Producto no encontrado.
*/
  router.get('/:productId/Comment', getAllComment);

  
module.exports = router;