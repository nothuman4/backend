//user model ko hm require krenge controllers k andr
const userModel = require('../models/user.models.js');
const blacklistTokenModel = require('../models/blacklistToken.model');
const userService = require('../service/user.service');
const {validationResult} = require('express-validator');
const { compare } = require('bcrypt');
module.exports.registerUser = async(req,res,next)=>
{
    //now iske andr hm fibnally user ko create krne ka logic likh rhe honge 
const errors = validationResult(req);//esa krne se agr request me kuch bhi glt hoga 
//jo jo conditions hmne rkhi h unme se to vo glt part hme request me mil jayega 
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
const {fullname,email,password}= req.body;
const isUserAlreadyExist = await userModel.findOne({email});
if(isUserAlreadyExist)
{
    res.status(400).json({message:'user already exist '})
}
const hashPassword = userModel.hashPassword(password);//why to hash this bcoz database me hm password 
//kbhi bhi plain text format me save nhi krwate
const user = await userService.createUser(
    {
        firstname:fullname.firstname
        ,lastname:fullname.lastname
        ,email,password:hashPassword
    })
const token = user.generateAuthToken();
res.status(201).json({token,user});
}
//await blacklistTokenModel.create ({token});
module.exports.loginUser = async (req,res,next)=>{
const errors = validationResult(req);
if(!errors.isEmpty())
{
   return  res.status(400).json({errors:errors.array()})
}
const {email,password} =req.body ;
const user = await userModel.findOne({email}).select('+password');//yha hm user model ko await krke 
//req body se data fetch krke ye check krenge email ke basis pe ki kya uye particular user exist krta h ya nhi
//use of +password>>>  ye hme password ko explicitly access krne me help krta h bcoz hme check krna hota h ki user ka given password shi h ya nhi 
if(!user)
{
     return res.status(401).json({message:'invalid email or password'})
}
const isMatch = await user.comparePassword(password);
if(!isMatch)
{
    return res.status(401).json({message:'invalid email or password'});
}
const token = generateAuthToken();
res.status(200).json({token,user});
}
module.exports.getUserProfile = async (req,res,next)=>
{
res.status(200).json(req.user);// jo req.user hmne set kiya tha middleware me vhi chla jayega hmari profile pr 
}
module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    res.status(200).json({message:'logged out'});
    await blacklistTokenModel.create({token});}
//hello