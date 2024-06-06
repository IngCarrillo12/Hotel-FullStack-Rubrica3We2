import jwt from "jsonwebtoken"
import { SECRETKEYPASSWORD } from "../config.js"

export const authRequired = (req, res, next)=>{
    const { token } = req.cookies
    console.log('cookie', req.cookies)
    console.log('req',req.cookie)
    console.log('TOKEN', token)
    if(!token) return res.status(401).send({message: 'autorizacion denegada'})
    jwt.verify(token,SECRETKEYPASSWORD,(error,user)=>{
        if(error)return res.status(401).send({message: 'Token invalido'})
        req.user = user
        next();
})
}