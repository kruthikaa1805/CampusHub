const express=require('express')
const cors = require('cors');
const path = require('path');
const app=express()
app.use(cors(
    {
        origin: '*',
        credentials : true
    }
))
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes=require('./routes/auth.routes')
const clubRoutes=require('./routes/club.routes')

const campusEventRoutes=require('./routes/campusEvent.routes')
const registrationRoutes=require('./routes/registration.routes')

app.use('/api/auth/',authRoutes);
app.use('/api/clubs',clubRoutes);
app.use('/api/events',campusEventRoutes);
app.use('/api/registrations',registrationRoutes);

module.exports=app