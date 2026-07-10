const express=require('express')
const cors = require('cors');
const path = require('path');
const app=express()
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://your-campushub-project.vercel.app' 
    ],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(express.json());


const authRoutes=require('./routes/auth.routes')
const clubRoutes=require('./routes/club.routes')

const campusEventRoutes=require('./routes/campusEvent.routes')
const registrationRoutes=require('./routes/registration.routes')

app.use('/api/auth/',authRoutes);
app.use('/api/clubs',clubRoutes);
app.use('/api/events',campusEventRoutes);
app.use('/api/registrations',registrationRoutes);

module.exports=app