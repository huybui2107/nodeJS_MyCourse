const express = require('express')
const router = express.Router();

const AccountController = require('../app/controllers/AccountController')


router.post('/add',AccountController.AddAccount);
router.get('/:id/edit',AccountController.edit);
router.put('/:id', AccountController.update);
router.delete('/:id', AccountController.delete);
router.delete('/:id/force', AccountController.destroy);
router.patch('/:id/restore', AccountController.restore);
router.post('/handle-form-action', AccountController.handleFormAction);
router.post('/handle-trashForm-action', AccountController.handleTrashFormAction);
module.exports = router;