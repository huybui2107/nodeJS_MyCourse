const express = require('express')
const router = express.Router();

const AccountController = require('../app/controllers/AuthController')



router.post('/login',AccountController.checkLogin);
router.get('/check',AccountController.checkSession);
router.get('/logout',AccountController.userLogout);
router.get('/register',AccountController.showRegister);
router.get('/',AccountController.showLogin);



module.exports = router;