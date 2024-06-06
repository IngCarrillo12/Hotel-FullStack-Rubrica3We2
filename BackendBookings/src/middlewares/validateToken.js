import jwt from "jsonwebtoken"
import { SECRETKEYPASSWORD } from "../config.js"

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    console.log('Cookies:', req.cookies);
    console.log('Token:', token);
  
    if (!token) return res.status(401).send({ message: 'Autorización denegada' });
  
    jwt.verify(token, SECRETKEYPASSWORD, (error, user) => {
      if (error) return res.status(401).send({ message: 'Token inválido' });
      req.user = user;
      next();
    });
  };