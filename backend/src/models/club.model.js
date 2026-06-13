const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    default: "General" 
  },
  presidentName: { 
    type: String, 
    default: "TBD" 
  },
  image: { 
    type: String, 
    default: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
  },
  adminId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);