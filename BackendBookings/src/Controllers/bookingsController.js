import { pool } from "../db.js"
import { errors } from "../errorHandling.js"

export const createBookings = async(req,res)=>{
    try {
        console.log(req.body)
        const {idhabitaciones, id_cliente, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida} = req.body
        const fechaMySQL = fecha_reservacion.slice(0, 19).replace('T', ' ');
        const [response] = await pool.query('INSERT INTO reservas (idhabitaciones, idcliente, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida) VALUES (?,?,?,?,?,?,?)', [idhabitaciones, id_cliente, nombre_cliente, telefono_cliente, fechaMySQL, fecha_entrada, fecha_salida])
        if(response.affectedRows === 0){
            return res.status(404).send({message: 'No se pudo crear la reserva'})
        }
        res.status(200).send({message:"Creacion exitosa!!", data: {idhabitaciones, id_cliente, nombre_cliente, telefono_cliente,fecha_reservacion, fecha_entrada, fecha_salida}})
    } catch (error) {
        console.log(error)
        const message = errors(error.errno)
        console.log(message)
        res.status(500).send({error: message})
    }
}
export const getAllBookings = async(req, res)=>{
    try {
        const [response] = await pool.query('SELECT * FROM reservas')
        if(response.length===0){
            return res.status(404).send({message: 'No se encontraron reservas'})
        }
        res.status(200).send(response)
    } catch (error) {
       console.log(error.message)
       res.status(500).send({error: error.message}) 
    }

}
export const getByBooking = async(req, res)=>{
    try {
        const {id} = req.params
        const [response] = await pool.query('SELECT * FROM reservas WHERE idreservas=?',[id])
        if(response.length===0){
            return res.status(404).send({message: 'No se encontraron reservas'})
        }
        res.status(200).send(response)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error: error.message})
    }
}
export const getBookingsByUserId = async(req,res)=>{
    try {
  
        const {id} = req.params
        const [response] = await pool.query('SELECT * FROM reservas INNER JOIN habitaciones ON habitaciones.idhabitaciones = reservas.idhabitaciones INNER JOIN users ON reservas.idcliente = users.idusers WHERE  idcliente = ?',[id])
        if(response.length===0){
            return res.status(404).send({message: 'No se encontraron reservas'})
        }
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}
export const updateBooking = async(req, res)=>{
    try {
        const {id} = req.params
        const {nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida} = req.body
        const [response] = await pool.query('UPDATE reservas SET nombre_cliente=?, telefono_cliente=?, fecha_reservacion=?, fecha_entrada=?, fecha_salida=? WHERE idreservas=?', [nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida, id])
        if(response.affectedRows ===0){
            return res.status(404).send({message: `No se ha encontrado reserva con el id=${id}`})
        }
        res.status(200).send(response)
    } catch (error) {
        const message = errors(error.errno)
        console.log(message)
        res.status(500).send(message)
    }
}
export const deleteBooking = async(req, res)=>{
    try {
        const {id} = req.params
        const [response] = await pool.query('DELETE FROM reservas WHERE idreservas = ? ', [id])
        if(response.affectedRows === 0){
            return res.status(404).send({message: `No se encontro ninguna reserva con el id=${id}`})
        }
        res.status(200).send({message:'Eliminado correctamente!!'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:error.message})

    }

}

export const bookingCompleteById = async(req,res)=>{
    try {
        const {id} = req.params
        const [response] = await pool.query('SELECT * FROM reservas INNER JOIN habitaciones ON habitaciones.idhabitaciones = reservas.idhabitaciones WHERE  idreservas = ?', [id]);
        if(response.length===0){
            return res.status(404).send({message: 'No se encontraron reservas'})
        }
        res.status(200).send(response)
    } catch (error) {
        const message = errors(error.errno)
        console.log(message)
        res.status(500).send({error: error})
        
    }
}