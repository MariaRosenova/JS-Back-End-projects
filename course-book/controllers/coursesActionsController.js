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
    const signUpList = courseDetails.signUpList.map(user => user.username).join(', ');
    const isOwner = courseDetails.owner && courseDetails.owner._id == req.user?._id;
    const isSigned = courseDetails.signUpList.some(user => user._id == req.user?._id);
    //objectId vs string

    try {
        res.render('details', { ...courseDetails, signUpList, isOwner, isSigned});
     

    } catch(err) {
        getErrorMessage(err);
    }
});

router.get('/catalog/:courseId/sign-up', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    try{
        await courseService.signUp(courseId, userId);

        res.redirect(`/catalog/${courseId}`)
    } catch(err) {
        getErrorMessage(err);
    }        
});

router.get('/catalog/:courseId/delete', isCourseOwner, async (req, res) => {
    await courseService.deleteCourse(req.params.courseId);
    res.redirect('/catalog');
});

router.get('/catalog/:courseId/edit', isCourseOwner, async (req, res) => {
    res.render('createCourse/edit', { ...req.course });
});

router.post('/catalog/:courseId/edit', isCourseOwner, async (req, res) => {
    const editedData = req.body;

    try {
        const courseData = await courseService.updateData(req.params.courseId, editedData);
        res.redirect(`/catalog/${req.params.courseId}`)
    } catch (err) {
        res.render('createCourse/edit', {...req.body, error: getErrorMessage(err)})
    }
});
router.get('/createCourse', (req, res) => {
    res.render('createCourse/create');
});

router.post('/createCourse', async (req, res) => {
    const courseData = req.body;


    try {

        await courseService.createCourse(req.user._id, courseData);
        res.redirect('/catalog');

    } catch(err) {

        const message = getErrorMessage(err);

        res.render('createCourse/create', { ...courseData, error: getErrorMessage(err) });
    }
});

async function isCourseOwner(req, res, next) {
    const course = await courseService.getOne(req.params.courseId).lean();
    
    if(course.owner != req.user?._id) {
        return res.redirect(`/catalog/${req.params.courseId}`);
    }

    req.course = course;
    next();
};

module.exports = router;