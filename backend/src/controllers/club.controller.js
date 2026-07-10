const Club = require('../models/club.model');

const createClub = async (req, res) => {
  try {
    const { name, description, category, presidentName } = req.body;

    // Default fallback image if the user doesn't upload a custom logo
    let imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; 
    
    // Cloudinary automatically attaches the secure, permanent cloud URL to req.file.path
    if (req.file && req.file.path) {
      imageUrl = req.file.path; 
    }

    const newClub = await Club.create({
      name,
      description,
      category,
      presidentName,
      image: imageUrl, // Save the cloud URL directly to MongoDB
      adminId: req.user._id 
    });

    res.status(201).json(newClub);

  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ message: "Server error while creating club" });
  }
};

const getClubs = async (req, res) => {
    try {
        const clubs = await Club.find().populate('adminId', 'name email');
        
        res.status(200).json({
            message: "Clubs fetched successfully",
            count: clubs.length,
            clubs
        });

    } catch (error) {
        console.error("Get Clubs Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createClub, getClubs };