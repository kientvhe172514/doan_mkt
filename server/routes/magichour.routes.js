const express = require('express');
const router = express.Router();
const {
    changeClothes
} = require('../controllers/magichour.controller');

// AI Clothes Changer
router.post('/clothes-changer', changeClothes);


module.exports = router; 