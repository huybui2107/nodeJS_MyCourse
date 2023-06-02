const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const { types } = require('util');
const Course = require('./Course');
const Schema = mongoose.Schema


const Account= new Schema ({
    name:{type:String , maxLength:255},
    sdt :{type:String},
    username:{type:String,maxLength:600},
    password:{type:String,maxLength:255},
    course :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref :'Course'
        }
    ],
    isAdmin:{type:Boolean},


},{
   timestamps:true,
});
mongoose.plugin(slug);
Account.plugin(mongooseDelete,{
    overrideMethods:'all',
    deletedAt:true,
});

const account = mongoose.model('Account', Account);
module.exports = account;