const router = require('express').Router();

router.get('/catalog', (req, res) => {
    res.render('catalog');
});

router.get('/createCourse', (req, res) => {
    res.render('create');
});
module.exports = router;