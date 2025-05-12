const blacklistTokenModel = require('../db/models/blacklistToken.model');
const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
//const blacklistTokenModel = require('../models/blacklistToken.model');
module.exports.registerCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})}
    const {fullname,email,password,vehicle

    } = req.body;
const isCaptainAlreadyExist = await captainModel.findOne({email});
if(isCaptainAlreadyExist){
    return res.status(400).json({message:'captain already exists'})}
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain(
        {fullname:{
      firstname: fullname. firstname,
        lastname: fullname.lastname,
            email,
            password:hashedPassword,
        },
 vehicle:{
        colour:vehicle.colour,
        vehicleType:vehicle.vehicleType,
        capacity:vehicle.capacity,
       numberPlate:vehicle.NumberPlate,
    },
 });
    const token = captain.generateAuthToken();
    res .status(201).json({token,captain});}
module.exports.loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.arrray()})}
const {email,password} = req.body;
const captain = await captainModel.findOne({email}).select('+password');
if(!captain){
 return res.status(400).json({message:'invalid email or password'})}
const isMatch = await captain.comparePassword(password);
if(!isMatch){
    return res .status(400).json({message:'invalid email or password'})}
const token = captain.generateAuthToken();
res.cookie('token',token)//token generate hone k bad response ko save krenge cookie me 
res.status(200).json({token,captain})}
 module.exports.getCaptainProfile = async ()=> {
    res.status(200).json({captain:req.captain})}
 module.exports.logoutCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    //now token ko phle hm krenge blacklist
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message:'logged out successfully'})}

