import  Router  from "express";
import UserController from "../Controllers/UserControllers.js";
import ProtectProfilePage from '../midddleware/authMiddleware.js'
const router = Router()
router.get('/', UserController.homePage)
router.post('/', UserController.CreateUser)
router.get('/login', UserController.login)
router.post('/login',UserController.LoginUser)
router.get('/logout', UserController.logout)
router.get('/profile',ProtectProfilePage,(req, res)=>{
    res.render('profile')
});
export default router