const { model } = require('mongoose');
const router = require('express').Router();
const courseService = require('../services/courseService');
const userService = require('../services/userService');
const { isAuthMiddleware } =  require('../middlewares/authMiddleware')

router.get('/', async (req, res) => {
    const latestCourses = await courseService.getLatest().lean();
    
    res.render('home', {latestCourses});
});

router.get('/profile', isAuthMiddleware, async (req, res) => {

    const user = await userService.getInfo(req.user._id).lean();
    const createdCoursesCount = user.createdCourses.length;
    const signedUpCoursesCount = user.signedUpCourses.length;
    //const signedUpCoursesCount = user.signedUpCourses?.length || 0;
    
    res.render('profile', { user, createdCoursesCount, signedUpCoursesCount });
});


module.exports = router;