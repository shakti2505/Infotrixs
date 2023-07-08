import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type :String, 
        required:true,
        trim:true,
        minLength:5
    }, 
    email:{
        type: String,
        required:true,
        lowercase: true,
    },
    mobile:{
        type: String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true,
    }
})
//Model
const UserModel = mongoose.model('user',userSchema ) 
export default UserModel;
