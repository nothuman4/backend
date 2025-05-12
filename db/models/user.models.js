const mongoose = require('mongoose');
const bcrypt = require('bcrypt');//no longere supported
const jwt = require('jsonwebtoken');//no longer supported
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true, 
        minlength:[3,'first name must be 3 characters long'],
    },
    lastname:{
        type:String,
        //required:true,--yha last name ko must nhi krte h lets leave it simple
        minlength:[3,'last name must be 3 characters long'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'min length must be 5']
    },
    password:{
        type:String,
        required:true,
        unique:false,
        minlength:[6,'min length of password must be 6 characters'],
        select:false//ye isliye hota h kli jb koi useer ko find krta h to ye jo field hogi yani pasword
        //ye sath me nhi jayega
        },
    socketId:{//sockeId is used to live tracking
        type:String,},})
//now for hash password and to generate token//1.jsonwebtoken//2.bcrypt//now we will create some methods by userSchema
//ye methods hmne userSchema pr define kiye h
userSchema.methods.generateAuthToken = function (){
const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,
    {expiresIn:'24h'})
    return token;}
userSchema.methods.comparePassword =  async function (password)
{
return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword = async function (password)
{
   return await bcrypt.hash(password,10);
}
const userModel = mongoose.model('user',userSchema);
module.exports = userModel;
//here we have created user model 
//h
