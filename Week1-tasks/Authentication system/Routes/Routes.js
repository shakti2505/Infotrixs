import  Router  from "express";
import UserController from "../Controllers/UserControllers.js";
import Authmiddleware from "../midddleware/authMiddleware.js";
const router = Router()
router.get('/', UserController.homePage)
router.post('/', UserController.CreateUser)
router.get('/login', UserController.login)
router.post('/login',UserController.LoginUser)
router.get('/logout', UserController.logout)
router.get('/profile',Authmiddleware.ProtectProfilePage,(req, res)=>{
    res.render('profile', {title:'profile' , message:"signup successfully"})
});
export default router