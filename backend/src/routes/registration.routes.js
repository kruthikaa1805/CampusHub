const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller.js');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

router.post('/join', protect, registrationController.registerForEvent);
router.put('/checkin', protect, adminOnly, registrationController.checkInStudent);
router.get('/my-tickets', protect, registrationController.getMyRegistrations);
router.get('/event/:eventId', protect, adminOnly, registrationController.getEventRegistrations);

module.exports = router;