import dotenv from 'dotenv'
dotenv.config()
import UserModel from "../Models/User_model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
// creating jWT Token
const maxAge = 3 * 60 * 60
const creatToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    })
}
class UserController {
    static homePage = (req, res)=>{
        try {
            const data = {
                title: "Authentication App",
                message: "Welcome to Infotrix"
            };
            res.render("signUp", data);
        } catch (error) {
            console.log(error)
        }
    }
    static CreateUser = async (req, res)=>{
        //hasing the password
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        try {
            // creating new document using user model
            const {name, email, mobile}  = req.body
            const data = await UserModel.findOne({email:email})
            // console.log(data)
            if(data==null){
                const user = new UserModel({
                    name:name,
                    email:email,
                    mobile:mobile,
                    password:hashPassword
                })
                await user.save()
                // Generating JWT token
                const token  = creatToken(user._id)
                res.cookie("jwt", token, {httpOnly:true, maxAge:maxAge * 1000})
                res.redirect('/login')
            }
            else{
                res.send("Email id Already Exist")
            }
        } catch (error) {
            console.log(error)
        }
    }
    static login = (req, res)=>{
        res.render("login", {title:"Login"})
    }
    static LoginUser = async (req, res)=>{
        try {
            const {email, password} = req.body
            const user = await UserModel.findOne({email:email})
            if(user!=null){
                const passMatch = bcrypt.compare(password, user.password)
                if(user.email==email && passMatch){
                    // console.log(user._id)
                    const token  = creatToken(user._id)
                    res.cookie("jwt", token, {httpOnly:true, maxAge:maxAge * 1000})
                    res.render('profile', {title:"Profile", username:user.name})
                }
                else{
                    res.render("InvalidCredentials", {message:"Incorrect Email or Password"})
                }
            }
            else{
                res.render("Unregistered_User", {message:"This email is not registered"})
            }
        } catch (error) {
            console.log(error)
        }
    }
    static logout = (req, res)=>{
        res.cookie('jwt', '', {expires: new Date(0)});
        res.redirect('/login')
    }
}
export default UserController