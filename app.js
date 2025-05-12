const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
 const app = express();
 const cors = require('cors');
 const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
 app.use(cors());
 app.use(cookieParser());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 const connectToDb = require('./db/db');
    connectToDb();
    const userRoutes = require('./routes/user.routes');
 /*app.get('/',(req,res)=>{
    res.send('hello world');})*/
 app.use('/users',userRoutes);
 app.use('/captain',captainRoutes);
module.exports = app;
//hello