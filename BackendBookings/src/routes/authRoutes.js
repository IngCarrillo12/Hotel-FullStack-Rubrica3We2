import { Router } from "express";
import {logout, signIn, signUp, updateUser} from '../Controllers/authController.js'
import { authRequired } from "../middlewares/validateToken.js";
const routerAuth = Router();
routerAuth.post('/register', signUp )
routerAuth.post('/login', signIn) 
routerAuth.post('/logout', logout)
routerAuth.put('/profile', authRequired, updateUser)
export default routerAuth