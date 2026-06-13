const express = require('express');
const router = express.Router();
const campusEventController = require('../controllers/campusEvent.controller');

const { protect, adminOnly } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/create', protect, adminOnly, upload.single('image'), campusEventController.createEvent);
router.get('/', campusEventController.getAllEvents);

module.exports = router;