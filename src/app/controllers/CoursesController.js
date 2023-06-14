const Course = require('../models/Course');
const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongose');
const { request, response } = require('express');
class CourseController {

    //[get] /course/slug
    show(req, res, next) {
        if(req.session.user_id){
            Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { 
                    course: mongooseToObject(course) ,
                    isLogin : true,
                    isUser : true,
                    Name :req.session.user_infor
                })
            })
            .catch(next)
        }
        else if(req.session.admin_id){
            Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { 
                    course: mongooseToObject(course) ,
                    isLogin : true,
                    isAdmin : true,
                    Name :req.session.admin_infor
                })
            })
            .catch(next)
        }
        
    }
    //[get] /course/create
    create(req, res, next) {
        if(req.session.admin_id){
            res.render('courses/create',{
                isLogin : true,
                isAdmin : true,
                Name : req.session.admin_infor
            })
        }

    }
    //[post] /course/store
    store(req, res, next) {
        //  res.json(req.body);
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.png`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(next);

    }
    //[get] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course),
                isLogin : true,
                isAdmin : true,
                Name : req.session.admin_infor
            }))
            .catch(next)

    }
    //[put] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/'))
            .catch(next)

    }
    //[delete] /course/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[patch] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[delete] /course/:id/force
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[Post] /course/hanle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.coursesIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: 'Action not allowed' })
        }
    }
    
    handleTrashFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.deleteOne({ _id: { $in: req.body.coursesIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.coursesIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: 'Action not allowed' })
        }
    }
    

    
}

module.exports = new CourseController();