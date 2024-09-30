const express = require('express');
const router = express.Router();
 const { register , login, getUsuarios} = require('../controllers/controllers');
const { validator, validatorLogin } = require('../middlewares/middlewares');

router.post('/usuarios',validator, register );

router.post('/login',validatorLogin, login);

router.get('/usuarios', getUsuarios);

module.exports = router;