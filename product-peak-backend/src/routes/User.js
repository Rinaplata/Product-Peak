const { Router } = require('express');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/UserController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');


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
