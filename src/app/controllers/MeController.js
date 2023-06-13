const Course = require('../models/Course');
const Account = require('../models/Account');
const {mutipleMongooseToObject}  = require('../../util/mongose');
const { request } = require('express');
const account = require('../models/Account');
class MeController {

    //[get] /course/slug

    
    storedCourses(req, res, next) {
    //    res.json(res.locals._sort);
        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]:req.query.type,
            })
                    
        }
        if(req.session.admin_id){
           Promise.all([courseQuery,Course.countDocumentsDeleted()])
            .then(([courses,deleteCount]) =>
                res.render('me/stored-courses',{
                deleteCount,
                courses : mutipleMongooseToObject(courses),
                isLogin : true,
                isAdmin : true,
                Name : req.session.admin_infor
                }) 
            )
            .catch(next)
        }
        // Course.countDocumentsDelete()
        //     .then((deleteCount) =>{

        //     })
        //     .catch(() => {})
        // Course.find({})
        //     .then(courses => res.render('me/stored-courses',{
        //         courses : mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next)
        
    }
    //[get] /me/trash/course
    trashCourses(req, res, next) {
        if(req.session.admin_id){
        Course.findDeleted({deleted: true})
            .then(courses => res.render('me/trash-courses',{
                courses : mutipleMongooseToObject(courses),
                isLogin : true,
                isAdmin : true,
                Name : req.session.admin_infor
            }))
            .catch(next)
        }
        
    }
    trashUser(req, res, next) {
        if(req.session.admin_id){
            Account.findDeleted({deleted: true})
            .then(account => res.render('me/trash_user',{
                account : mutipleMongooseToObject(account),
                isLogin : true,
                isAdmin : true,
                Name : req.session.admin_infor
            }))
            .catch(next)
        }
        
    }

}

module.exports = new MeController();