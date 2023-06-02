const express = require('express')
const router = express.Router();

const CourseController = require('../app/controllers/CoursesController')
const  AccountController =require('../app/controllers/AccountController')
router.get('/create', CourseController.create);
router.post('/store', CourseController.store);
router.get('/mycourses',AccountController.getMyCourse);
router.get('/mycourses/:id', AccountController.addMyCourse);
router.put('/delmycourses/:id', AccountController.DeleteMyCourse);
router.get('/:id/edit', CourseController.edit);
router.patch('/:id/restore', CourseController.restore);
router.post('/handle-form-action', CourseController.handleFormAction);
router.post('/handle-trashForm-action', CourseController.handleTrashFormAction);
router.put('/:id', CourseController.update);
router.delete('/:id', CourseController.delete);
router.delete('/:id/force', CourseController.destroy);
router.get('/:slug', CourseController.show);


module.exports = router;