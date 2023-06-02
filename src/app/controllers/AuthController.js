const Account = require('../models/Account');
const Course = require('../models/Course');

const { mongooseToObject ,mutipleMongooseToObject } = require('../../util/mongose');
const { request, response } = require('express');


AuthController = {
    checkLogin: async (req, res, next) => {
        try {
            var username = req.body.username;
        var password = req.body.password;
        const user = await Account.findOne({ username: username});
        const courses = await Course.find();
        if(!user){
            res.render('account/login' , {layout :'login_layout',
                errors_user: [
                    {
                        error: 'User not found',
                    }
                ]
            });
           
            return;
        }
        if (user.password !== password){
            res.render('account/login' , {layout :'login_layout' ,
                errors_pass: [
                    {
                        error: 'Password Incorrect',
                    }
                ]
            });
            
            return;
        }
        if(user.isAdmin ==  false){
            req.session.user_id = user.id;
            req.session.user_infor = user.name;
             
    
        }
        else if(user.isAdmin == true){
            req.session.admin_id = user.id;
            req.session.admin_infor = user.name;
            
        }
        res.redirect('/')
        } catch (error) {
            
        }
    },
    showLogin : (req, res) =>{
        res.render('account/login' , {layout :'login_layout'});
    },
    checkSession : (req, res) =>{
        if (req.session) {
            // Session đã được lưu
            res.json(req.session);
          } else {
            // Session chưa được lưu
            res.send('Session chưa được lưu');
          }
    },
    userLogout :async (req, res) => {
        try {
            req.session.destroy();
            res.redirect('/');
    
        } catch (error) {
            console.log(error.message);
    
        }
    },
    showRegister :async (req, res) => {
        res.render('account/register',{layout :'login_layout'})
    }
    
}

module.exports = AuthController;