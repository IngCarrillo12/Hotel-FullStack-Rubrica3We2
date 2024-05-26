import express, { urlencoded } from 'express'
import routerRooms from './routes/roomsRoutes.js';
import routerBookings from './routes/bookingsRoutes.js';
import routerAuth from './routes/authRoutes.js';
import cookieParser from 'cookie-parser'
import { PORT } from './config.js';
import cors from 'cors'

const app =  express();
app.use(urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.get('/', (req, res)=>{
    res.send('WELCOME!')            
})
app.use('/users',routerAuth)
app.use('/rooms',routerRooms)
app.use('/bookings',routerBookings)
app.listen(PORT, ()=>{console.log(`Servidor ejecutandose!! http://localhost:${PORT}`)})