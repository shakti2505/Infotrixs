import jwt from 'jsonwebtoken'
import UserModel from '../Models/User_model.js';
class Authmiddleware {
    static ProtectProfilePage = (req, res, next)=>{
        const token  = req.cookies.jwt;
        if(!token){
            return res.send("Login again")
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY)
            next();
        } catch (error) {
            console.log(error)
        }
    }

    static  CheckUser = (req, res,  next)=>{
        console.log("check user middle ware working")
        const token = req.cookies.jwt;
        console.log(token)
        if(token){
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodeToken)=>{
                if(err){
                    console.log(err.message)
                    res.locals.user = null;
                    next();
                }else{
                    console.log(decodeToken);
                    let user =  await UserModel.findById(decodeToken.id);
                    res.locals.user = user;
                    next();
                }
            })
        }
        else{
            res.locals.user = null;
            next();
        }
    }
}

export default Authmiddleware;