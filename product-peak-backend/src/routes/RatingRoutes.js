const { Router } = require('express');
const router = Router();


const { createRating, getAllRating } = require('../controllers/RatingController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

// Create a new Comment 
router.post(
    '//rating', 
    [
      check('productId', 'Product id is mandatory').not().isEmpty(),
      check('userId', 'User id is mandatory').not().isEmpty(),
      check('rating', 'rating is mandatory').not().isEmpty().isInt({ min: 1, max: 5 }),
      validateFields
    ],
    createRating
  );

  router.get('/:productId/rating', getAllRating);

  
module.exports = router;
