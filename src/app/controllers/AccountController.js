const Account = require('../models/Account');

const { mongooseToObject ,mutipleMongooseToObject} = require('../../util/mongose');
const { request, response } = require('express');
const account = require('../models/Account');

 AccountController = {
    AddAccount: async (req, res, next) => {
    //     try {
    //         const account = await Account.find();
    //         res.status(200).json(account);
    //     } catch (error) {
    //         res.status(500).json({ error: error});
    //     }
    // },
    try {
        
        const account = new Account(req.body);
        account.isAdmin ="false"
        const savedAccount = await account.save();
        // req.session.destroy();
        const user = await Account.findOne({ username: req.body.username });
        if(request.session){
            req.session.destroy();
            req.session.user_id = user.id;
            req.session.user_infor = user.name;
        }
        else {
            req.session.user_id = user.id;
            req.session.user_infor = user.name;
        }
        res.redirect('/')

    } catch (error) {
        res.status(500).json({ error: error});
    }
    },
    ShowListAccount : async (req, res) =>{
         if(req.session.admin_id){
            try {
                let user =await Account.find({});
                res.render('account/show',{
                accounts: mutipleMongooseToObject(user),
                isLogin : true,
                isAdmin : true,
                Name :req.session.admin_infor
             })
         
             } catch (error) {
                
             }
         }
       
    },
    getMyCourse : async (req, res ,next) => {
        try {
           const courses = await Account.findById(req.session.user_id).populate('course')
           arr = []
           courses.course.forEach( course =>{
                arr.push(course)
           })
           res.render("courses/mycourse" ,{
             courses : mutipleMongooseToObject(arr),
             isLogin : true,
                isUser :true,
                Name : req.session.user_infor
           })
           
        } catch (error) {
            
        }
    },
    addMyCourse :async (req, res) =>{
            try {
               await Account.findByIdAndUpdate(req.session.user_id, { $push: { course: req.params.id } }, { new: true })
                    const courses = await Account.findById(req.session.user_id).populate('course')
                    res.redirect('/courses/mycourses')      
            } catch (error) {
                
            }
    },
    DeleteMyCourse :  async (req, res) => {
        try {
            await Account.findByIdAndUpdate(req.session.user_id, { $pull: { course: req.params.id } }, { new: true })
                 const courses = await Account.findById(req.session.user_id).populate('course')
                 res.redirect('/')      
         } catch (error) {
             
         }
    },
    edit : async(req, res) => {
        // Course.findById(req.params.id)
        //     .then(course => res.render('courses/edit', {
        //         course: mongooseToObject(course),
        //         isLogin : true,
        //         isAdmin : true,
        //         Name : req.session.admin_infor
        //     }))
        //     .catch(next)
        try {
            const account = await Account.findById(req.params.id);
            res.render('account/edit', {
                        account: mongooseToObject(account),
                        isLogin : true,
                        isAdmin : true,
                        Name : req.session.admin_infor
                    })
          
      
        } catch (error) {
            
        }

    },
    update :async (req, res) => {
            try {
                await Account.updateOne({_id:req.params.id},req.body);
                res.redirect('/me/stored/account')
            } catch (error) {
                
            }
    }
}

module.exports = AccountController;