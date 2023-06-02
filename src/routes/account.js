const express = require('express')
const router = express.Router();

const AccountController = require('../app/controllers/AccountController')


router.post('/add',AccountController.AddAccount);


module.exports = router;