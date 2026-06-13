const CampusEvent = require('../models/campusEvent.model');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, time, location, clubId, capacity } = req.body;

        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        const newEvent = await CampusEvent.create({
            title,
            description,
            date,
            time,
            location,
            clubId,
            capacity: capacity ? Number(capacity) : 100, 
            image: imagePath
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