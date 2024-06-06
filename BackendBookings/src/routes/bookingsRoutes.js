import { Router } from "express";
import { createBookings, deleteBooking, getAllBookings, getByBooking, updateBooking, bookingCompleteById, getBookingsByUserId} from "../Controllers/bookingsController.js";

const routerBookings = Router()

routerBookings.post('/', createBookings)
routerBookings.get('/', getAllBookings)
routerBookings.get('/:id', getByBooking)
routerBookings.put('/:id', updateBooking)
routerBookings.delete('/:id', deleteBooking)
routerBookings.get('/infocomplete/:id', bookingCompleteById)
routerBookings.get('/getBookingByUser/:id', getBookingsByUserId)
export default routerBookings