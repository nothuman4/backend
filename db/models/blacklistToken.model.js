//is file ko hmne create kiya h logout route ko perform krne k liye//hm krenge ye ki hm vo sare accounts jo logout ho chuke h unke tokens ko blacklist kr denge //for this we also need database 
const mongoose = require('mongoose');
const blacklistTokenSchema =  new mongoose.Schema(
    {
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
    type:Date,
    default:Date.now,
    expires:'86400'//seconds in 24 hours
    }
})
module.exports = mongoose.model('blacklistToken',blacklistTokenSchema);
//hello