const router = require('express').Router();
const { getErrorMessage } = require("../utils/errorUtils");
const courseService = require('../services/courseService');

router.get('/catalog', async (req, res) => {

    const courses = await courseService.getAll().lean();
    
    res.render('createCourse/catalog', { courses });
});

router.get('/catalog/:courseId', async (req, res) => {
    const course = req.params.courseId;
    
    const courseDetails = await courseService.getOneDetailed(course).lean();
  
    try {
        res.render('details', { ...courseDetails });
     

    } catch(err) {
        getErrorMessage(err);
    }
});

router.get('/catalog/:courseId/sign-up', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    try{
        await courseService.signUp(courseId, userId);
        console.log('success')
       // res.redirect(`/catalog/${course}`)
    } catch(err) {
        getErrorMessage(err);
    }
    console.log('clicked')

        
});

router.get('/createCourse', (req, res) => {
    res.render('createCourse/create');
});

router.post('/createCourse', async (req, res) => {
    const courseData = req.body;


    try {

        await courseService.createCourse(req.user._id, courseData);
        res.render('createCourse/catalog');
    } catch(err) {

        const message = getErrorMessage(err);

        res.render('createCourse/create', { ...courseData, error: getErrorMessage(err) });
    }


});


module.exports = router;