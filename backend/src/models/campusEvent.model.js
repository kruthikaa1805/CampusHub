const mongoose = require('mongoose');

const campusEventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    clubId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Club', 
        required: true 
    },
    image: { 
        type: String 
    },
    capacity: { 
        type: Number, 
        required: true, 
        default: 100 
    },
    registeredCount: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model('CampusEvent', campusEventSchema);