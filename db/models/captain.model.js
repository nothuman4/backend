const mongoose = require('mongoose');
//now we have to create a model 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const captainSchema = new mongoose.Schema(
{
    fullname:{
    firstname:{
        type:String,
        required:true,
        minlength:[3,'firstname must be 3 characters long']},
        lastname:{
            type:String,
            required:true,
            minlength:[3,'lastname must be 3 characters long']}},


email:{
    type:String,
required:true,
unique:true,
lowercase:true,

},
password:{
    type:String,
    minlength:[6,'min length of password must be 6 characters'],
    required:true,
    unique:true,

},
socketId:{
    type:String
},
status:{
    type:String,
    enum:['active','inactive'],
    default:'inactive'
},
vehicle:{ 
    colour:{
        type:String,
        required:true,

    },
    capacity:{
        type:Number,
        min :[1,'1 passenger atleast'],
        required:true
    },
    weightCapacity:{
        type:Number,
        required:true,
        min:[60,'60 kg should be minimum capacity of the vehicle']
    },
    NumberPlate:{
        type:String,
        required:true
    },
    vehicleType:{
        type:String,
        enum:['bike','car','auto','e rickshaw','loader_truck'],
        required:true,
    },
    location :{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }}}}
)
    captainSchema.methods.generateAuthToken = function()
    {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24 hr'})
    return token;
    }
    captainSchema.methods.comparePassword = async function(password)
    {
        return await  bcrypt.compare(password,this.password);
    }
    captainSchema.statics.hashPassword = async function (password)
    {
        return await bcrypt.hash(password,10)
    }
    const captainModel = mongoose.model('captain',captainSchema);
    module.exports = captainModel;
    //hello
    