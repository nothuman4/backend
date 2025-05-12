const userModel = require('../models/user.models');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../db/models/blacklistToken.model');
//const captainModel = require('../models/captain.model');
//now ek middleware hme create krna h ye check krne k liye ki kya user authenticate h ya nhi 
module.exports.authUser = async(req,res,next)=>
{
//now is middleware k liye yani user ko authenticate krne k liye hme chahiye hoga user token 
//user token hme milega ya to cookies me ya fir header k andr to hm dono hi jgh check kr lenge 
const token = req.cookies.token || req.headers.authorization?.split('')[1];//yha authorization ko hme split bhi krna hoga 
if(!token)
return res.status(401).json({message:'unauthorized'});//yani agr dono hi jgh  token na mile to ye message dikha denge }
const isBlacklisted = await userModel.findOne({token});
if(isBlacklisted)
{
    res.status(401).json({message:'unauthorized'});
}
//now decoded wala mamla aata h try and catch me
try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    //now decoded agr hm krte h to decoded me vhi data aayega jo token ko create krte vokt hmne likha hoga 
    const user = await userModel.findById(decoded._id);
    req.user = user // req.user me jo bhi user hme mila hoga usme hm set krenge 
    return next();}
    catch(err)
    {
        return res.status(401).json({message:unauthorized});//agr token ko decode krte wkt koi error aata h 
        //to ye us error ko catch krne or response dene k liye h 
        }}
module.exports.authCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];//yha authorization ko hme split bhi krna hoga 
if(!token){
    return res.status(401).json({message:"unauthorized"});//yani agr dono hi jgh  token na mile to ye message dikha denge 
}
const isBlacklisted = await blacklistTokenModel.findOne({token:'token'});
if(isBlacklisted)
{
    res.status(401).json({message:'unauthorized'});
}
//now decoded wala mamla aata h try and catch me
try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    //now decoded agr hm krte h to decoded me vhi data aayega jo token ko create krte vokt hmne likha hoga 
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain; // req.user me jo bhi user hme mila hoga usme hm set krenge 
    return next();}
    catch(err) {
        return res.status(401).json({message:unauthorized});//agr token ko decode krte wkt koi error aata h 
        //to ye us error ko catch krne or response dene k liye h 
         }
}
//to token to hme finally yha se mil jayega but is token ko ab hme krna h decrypt
//hello
