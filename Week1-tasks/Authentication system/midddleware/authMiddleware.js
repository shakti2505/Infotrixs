import jwt from 'jsonwebtoken'
const ProtectProfilePage = (req, res, next)=>{
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
export default ProtectProfilePage;


