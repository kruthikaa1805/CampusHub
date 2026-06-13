const Registration = require('../models/registration.model');
const CampusEvent = require('../models/campusEvent.model');

const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const studentId = req.user.id; 

        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required." });
        }

        const event = await CampusEvent.findOneAndUpdate(
            { 
                _id: eventId,
                $expr: { $lt: ["$registeredCount", "$capacity"] } 
            },
            { 
                $inc: { registeredCount: 1 } 
            },
            { new: true }
        );

        if (!event) {
            const checkEvent = await CampusEvent.findById(eventId);
            if (!checkEvent) return res.status(404).json({ message: "Event not found." });
            return res.status(400).json({ message: "Sorry, this event is at maximum capacity or experiencing high traffic." });
        }

        const newRegistration = await Registration.create({
            studentId,
            eventId
        });
        
        res.status(201).json({
            message: "Successfully registered for the event!",
            ticket: newRegistration
        });

    } catch (error) {
        if (error.code === 11000) {
            await CampusEvent.findByIdAndUpdate(eventId, { $inc: { registeredCount: -1 } });
            return res.status(400).json({ message: "You are already registered for this event." });
        }
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const checkInStudent = async (req, res) => {
    try {
        const idToUpdate = req.body.ticketId || req.body.registrationId;

        if (!idToUpdate) {
            return res.status(400).json({ message: "Ticket ID is required." });
        }

        const ticket = await Registration.findById(idToUpdate);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        if (ticket.status === 'Attended') {
            return res.status(400).json({ message: "Student is already checked in." });
        }

        ticket.status = 'Attended';
        await ticket.save();

        res.status(200).json({
            message: "Check-in successful! Student marked as attended.",
            ticket
        });

    } catch (error) {
        console.error("Check-in Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getMyRegistrations = async (req, res) => {
    try {
        const studentId = req.user.id; 
        const myTickets = await Registration.find({ studentId: studentId })
            .populate('eventId')
            .sort({ registeredAt: -1 });

        res.status(200).json(myTickets);

    } catch (error) {
        console.error("Fetch Registrations Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;
        
        const attendees = await Registration.find({ eventId: eventId })
            .populate('studentId', 'name email') 
            .sort({ registeredAt: -1 });

        res.status(200).json(attendees);

    } catch (error) {
        console.error("Fetch Event Attendees Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { 
    registerForEvent, 
    checkInStudent, 
    getMyRegistrations, 
    getEventRegistrations 
};
