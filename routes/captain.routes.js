const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const {body} = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');
 router.post('/register',[
body('email').isEmail().withMessage('invalid email'),
body('fullname.firstname').isLength({min:3}).withMessage('firstname must be 3 charaacters long'),
body('password').isLength({min:6}).withMessage('password must be 6 characters long'),
body('vehicle.numberPlate').isLength({min:5}).withMessage('vehicle number plate must contain 5 characters'),
body('vehicle.capacity').isInt({min:1}).withMessage('vehicle capacity should be one atleast'),
body('vehicle.vehicleType').isIn(['bike','car','auto','e rickshaw','loader_truck']).withMessage('invalid vehicle type'),


 ],captainController.registerCaptain);
    // now  jese hmne user service bnayi thi for user creation vese hi yha bhi ek service bnani h for captain creation
 //iske andr 2 chizo k validation lgenge ek to captain wale sath hi sath 
 //vehicle wale bhi validations yha pr lgenge
 //now hme captain ko logout and login krne k liye routes create krne h
  router.post('/login', [
body('email').isEmail().withMessage('invalid email'),
body('password').isLength({min:6}).withMessage('password must be  6  characters long')],captainController.loginCaptain )
 router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)
 router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);
 module.exports = router; 
//h