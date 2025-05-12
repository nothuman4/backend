const captainModel = require('../models/captain.model');
module.exports.createCaptain = async ({
    firstname,lastname,email,password,colour,capacity,NumberPlate,vehicleType
})=>
    {
if(!firstname || !lastname || !email || !password || !colour|| !capacity  || !NumberPlate || !vehicleType)
    throw new error('all fields are required');
//ye error ko throw krega agar koi bhi field empty h to
}
const captain =  await captainModel.create(
    {
        fullname:{
            firstname,
            lastname,
                email,
                password,},
        vehicle:{
            colour,
            vehicleType,
            capacity,
            NumberPlate}})
return captain;
//h