const Course = require('../models/Course');
const Account = require('../models/Account');
const {mutipleMongooseToObject}  = require('../../util/mongose');
SiteController = {

    // [get] /search
     index : async (req, res,next) => {
        const courses = await Course.find();
        if(req.session.user_id ) {
        const mycourse = await Account.findById(req.session.user_id).populate('course')
        id = [] 
        mycourse.course.forEach( course =>{
            id.push(course.id)
       })
       arr = []
        for ( let i =0 ; i < courses.length ;i++){
            if (! id.includes(courses[i].id)){
                arr.push(courses[i])
            }
        }
            res.render('home',{
                courses : mutipleMongooseToObject(arr),
                isLogin : true,
                isUser :true,
                Name : req.session.user_infor
            })
        }
        else if(req.session.admin_id){
            res.render('home',{
                courses : mutipleMongooseToObject(courses),
                isLogin : true,
                isAdmin : true,
                Name : req.session.admin_infor
            })
        }
        else {
            res.render('home',{
                courses : mutipleMongooseToObject(courses),
            })
        }


    }


   
}

module.exports =  SiteController;