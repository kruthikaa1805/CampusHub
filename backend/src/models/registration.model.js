const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CampusEvent', 
        required: true
    },
    status: {
        type: String,
        enum: ['Registered', 'Attended'],
        default: 'Registered'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

registrationSchema.index({ studentId: 1, eventId: 1 }, { unique: true });

const registrationModel = mongoose.model("Registration", registrationSchema);
module.exports = registrationModel;