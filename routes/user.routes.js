const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware');
const{body} = require("express-validator");
router.post('/register',[ 
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage
    ('first name must be 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be 3 characters'),
],userController.registerUser);//this is a route
//here we use a array to check whether the provided details are valid or not 
//this array is a  callback 
router.post('/login',[
body('email').isEmail().withMessage('invalid email'),
body('password').isLength({min:6}).withMessage('password must be 6 characters long')],
userController.loginUser)
 router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
 router.get('/logout',authMiddleware.authUser,userController.logoutUser)
module.exports = router;
//here we use a package called express validator 
//this is used to whether the info provided by user is correct or not 
//h
