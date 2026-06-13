const express=require('express')
const router=express.Router();
const clubController = require('../controllers/club.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/create',protect,adminOnly,upload.single('image'),clubController.createClub);
router.get('/',clubController.getClubs);

module.exports=router