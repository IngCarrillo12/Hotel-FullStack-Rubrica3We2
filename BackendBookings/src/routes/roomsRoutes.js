import { Router } from "express";
import { deleteRoom, createRoom, getAllRooms, getByIdRooms, updateRoom } from "../Controllers/roomsController.js";
const routerRooms = Router()

routerRooms.delete('/:id',deleteRoom)
routerRooms.get('/', getAllRooms)
routerRooms.get('/:id', getByIdRooms)
routerRooms.post('/', createRoom)
routerRooms.put('/:id', updateRoom)

export default routerRooms;