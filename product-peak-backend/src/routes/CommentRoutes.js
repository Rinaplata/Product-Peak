const { Router } = require('express');
const router = Router();


const { createComment, getAllComment  } = require('../controllers/CommentController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

// Create a new Comment 
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

  router.get('/:productId/Comment', getAllComment);

  
module.exports = router;