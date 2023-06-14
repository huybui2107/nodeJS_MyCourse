const express = require('express')
const router = express.Router();

const meController = require('../app/controllers/MeController')
const  AccountController =require('../app/controllers/AccountController')
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);
router.get('/trash/user', meController.trashUser);
router.get('/stored/account',AccountController.ShowListAccount);



module.exports = router;