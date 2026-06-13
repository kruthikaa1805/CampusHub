const jwt = require('jsonwebtoken');
const protect = (req, res, next) => {
  
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
};

module.exports = { protect, adminOnly };