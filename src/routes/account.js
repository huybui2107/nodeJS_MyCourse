const express = require('express')
const router = express.Router();

const AccountController = require('../app/controllers/AccountController')


router.post('/add',AccountController.AddAccount);
router.get('/:id/edit',AccountController.edit);
router.put('/:id', AccountController.update);
module.exports = router;