const router = require('express').Router();
const { getErrorMessage } = require("../utils/errorUtils");
const courseService = require('../services/courseService');

router.get('/catalog', async (req, res) => {

    const courses = await courseService.getAll().lean();
    console.log(courses);
    res.render('createCourse/catalog', { courses });
});

router.get('/createCourse', (req, res) => {
    res.render('createCourse/create');
});

router.post('/createCourse', async (req, res) => {
    const courseData = req.body;
    console.log(courseData)

    try {

        await courseService.createCourse(courseData);
        res.render('createCourse/catalog');
    } catch(err) {

        const message = getErrorMessage(err);

        res.render('createCourse/create', { ...courseData, error: getErrorMessage(err) });
    }


});


module.exports = router;