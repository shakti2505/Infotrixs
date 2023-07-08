import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type :String, 
        required:[true, "Please enter a full name"],
        trim:true,
        minLength:5
    }, 
    email:{
        type: String,
        required:[true, "Please enter an email Address"],
        lowercase: true,
    },
    mobile:{
        type: String,
        required: [true, "Please enter Mobile"],
        trim:true
    },
    password:{
        type:String,
        required: [true, "Please enter Password"],
        trim:true,
        minLength:[6, "Password min length is 6 character"]
    }
})
//Model
const UserModel = mongoose.model('user',userSchema ) 
export default UserModel;
