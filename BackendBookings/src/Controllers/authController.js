import { pool } from "../db.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {SECRETKEYPASSWORD} from '../config.js'


export const signUp = async(req,res)=>{
    try {
        const {name, lastname, telefono, email, password, birthday} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const createdAt = new Date()
        const [response] = await pool.query('INSERT INTO users (name, lastname, telefono, email, password, birthday, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, lastname, telefono, email, passwordHash, birthday, createdAt])

        if(response.affectedRows === 0) return res.status(400).send({message: 'Registro invalido!!'})
        const idusers = response.insertId
        const user = {idusers, name, lastname, telefono, email, birthday, createdAt}
        jwt.sign(user, SECRETKEYPASSWORD,   { expiresIn: '1h' }, (err, token) => {
            if (err) return console.log(err);
            res.cookie('token', token);
            res.status(200).send({ idusers, name, lastname, telefono, email, birthday, createdAt });
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const [response] = await pool.query('SELECT * FROM users WHERE email= ?', [email]);
        if (response.length === 0) {
            console.log('User not found');
            return res.status(404).send({ message: "User no encontrado" });
        }
        
        const user = response[0];
        let isMatch = false;

        if (!user.admin) {
           
            isMatch = await bcrypt.compare(password, user.password);
        } else {
           
            isMatch = user.password === password;
        }

        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(401).send({ message: "Credenciales invalidas" });
        }

        // Eliminar el password antes de enviar la respuesta
        delete user.password;


        jwt.sign({user}, SECRETKEYPASSWORD, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.log(`JWT Error: ${err}`);
                return res.status(500).send({ message: "Error al generar el token" });
            }
            res.cookie('token', token);
            res.status(200).send(user);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).send({ message: error.message });
    }
};
export const logout = (req,res)=>{
    res.cookie('token', '',{
    expires: new Date(0)
   })
   return res.sendStatus(200);
}

export const updateUser = async(req, res)=>{
    try {
        const {name, lastname, password, birthday, email, idusers} = req.body
        if(password){
            const passwordHash = await bcrypt.hash(password, 10);
            const [response] = await pool.query('UPDATE users SET name=?, lastname=?, password=?, birthday=?, email=? WHERE idusers=?', 
                                              [name, lastname, passwordHash, birthday, email, idusers]);
    
            if(response.affectedRows === 0){
                return res.status(404).send({message: "No se pudo actualizar el usuario"});
            }
            return res.status(200).send({message: "Usuario actualizado con éxito"});
        }
       const [response] = await pool.query('SELECT password FROM users WHERE idusers=?', [idusers])
        const passwordResponse = response[0].password
        const [data] = await pool.query('UPDATE users SET name=?, lastname=?, password=?, birthday=?, email=? WHERE idusers=?', 
                                              [name, lastname, passwordResponse, birthday, email, idusers]);
    
            if(data.affectedRows === 0){
                return res.status(404).send({message: "No se pudo actualizar el usuario"});
            }
            return res.status(200).send({message: "Usuario actualizado con éxito"});

    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error email ya se encuentran registrados'});
    }
}

