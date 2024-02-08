const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const coursesActionsController = require('./controllers/coursesActionsController');

router.use(homeController);

router.use('/auth', authController);

router.use(coursesActionsController);
module.exports = router;