import dotenv from 'dotenv'
dotenv.config()
import  express  from 'express';
import user from './Routes/Routes.js';
import connectDB from './DB/ConnectionDB.js';
import './Models/User_model.js'
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 4000;
const DATABASE_URL = process.env.DATABASE_URL
//middleware
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());    
//intigrating the EJS
app.set('view engine', 'ejs');
app.set('views', 'views');
// Database connections
connectDB(DATABASE_URL)
//Load Router
app.use('/',user);
app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
});