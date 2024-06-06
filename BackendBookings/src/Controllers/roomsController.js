import { pool } from "../db.js"
import { errors } from "../errorHandling.js"

export const getAllRooms = async(req,res)=>{
    try {
        const [response] = await pool.query("SELECT * FROM habitaciones")
        if(response.length === 0){
           return res.status(500).send({message: 'No se encontraron habitaciones'})
        }
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
export const getByIdRooms = async(req,res)=>{
    const {id} = req.params
    try {
        const [response] = await pool.query(`SELECT * FROM habitaciones WHERE idhabitaciones = ?`,[parseInt(id)])
        if(response.length === 0 ){
            return res.status(404).send({message: 'Habitacion no encontrada'})
        }
        res.status(200).send(response)
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error: error.message})
    }
}
export const createRoom = async(req,res)=>{
    try {
        const {numero, tipo, valor} = req.body
        const [response] = await pool.query("INSERT INTO habitaciones (numero, tipo, valor) VALUES (?, ?, ?)",[numero,tipo,valor])
        if(response.affectedRows === 0){
            return res.status(404).send({message: 'No se pudo registrar la habitacion'})
        }
        res.status(200).send({message:"Creacion exitosa!!", data: {numero, tipo, valor}})
    } catch (error) {
        const message = errors(error.errno)
        console.log(message)
        res.status(500).send(message)
    }
   
  
}
export const deleteRoom = async(req, res)=>{
    try {
        const {id} = req.params
        await pool.query('DELETE FROM reservas WHERE idhabitaciones = ? ', [id])
        const [response] = await pool.query('DELETE FROM habitaciones WHERE idhabitaciones = ? ', [id])
        if(response.affectedRows === 0){
            res.status(500).send({message:`No se encontraron habitaciones con el id ${id}`})
        }
        res.status(200).send({message:'Eliminado correctamente'})
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
}
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { numero, tipo, valor } = req.body[0];
        const [response] = await pool.query('UPDATE habitaciones SET numero=?, tipo=?, valor=? WHERE idhabitaciones=?', [numero, tipo, valor, id]);
        if (response.affectedRows > 0) {
            res.status(200).send({ message: "Habitación actualizada correctamente" });
        } else {
            res.status(404).send({ message: "Habitación no encontrada" });
        }
    } catch (error) {
        const message = errors(error.errno)
        console.log(message)
        res.status(500).send(message)
    }
};
