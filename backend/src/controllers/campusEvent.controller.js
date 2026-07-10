const CampusEvent = require('../models/campusEvent.model');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, time, location, clubId, capacity } = req.body;

        // Default fallback image for events (e.g., a generic auditorium or crowd)
        let imagePath = 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        
        // Cloudinary automatically attaches the secure, permanent cloud URL to req.file.path
        if (req.file && req.file.path) {
            imagePath = req.file.path;
        }

        const newEvent = await CampusEvent.create({
            title,
            description,
            date,
            time,
            location,
            clubId,
            capacity: capacity ? Number(capacity) : 100, 
            image: imagePath // Save the cloud URL directly to MongoDB
        });

        res.status(201).json({
            message: "Event created successfully",
            event: newEvent
        });

    } catch (error) {
        console.error("Create Event Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await CampusEvent.find()
            .populate('clubId', 'name image') 
            .sort({ date: 1 }); 
        
        res.status(200).json(events);
    } catch (error) {
        console.error("Fetch Events Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createEvent, getAllEvents };