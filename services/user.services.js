const userModel = require('../models/user.models');
module.exports.createUser = async({firstname,lastname,email,password})=>{
//ye fn kaam krega user create krne ka and user create krne k liye hme jo jo chize chahiye unhe ye fn as an argument lega
//ye sare arguments fn me as an object pass honge 
if(!firstname || !lastname || ! email  ||! password)
{throw new Error('all fields are required');}
const user =  await userModel.create(
    {
        fullname:{firstname,lastname},
        email,
        password

    }
)
return user;
}
//h