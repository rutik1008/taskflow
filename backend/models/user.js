import mongoose from 'mongoose';
import validator from 'email-validator';

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String ,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
                return validator.validate(v);
            },
            message:"Please enter a valid email"
        }
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User =mongoose.model('user',userSchema);
export default User;