const { model } = require('mongoose');
const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/', async (req, res) => {
    const latestCourses = await courseService.getLatest().lean();
    
    res.render('home', {latestCourses});
});

router.get('/profile', (req, res) => {
    res.render('profile');
});


module.exports = router;