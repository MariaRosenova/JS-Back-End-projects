const router = require('express').Router();
const cookieParser = require("cookie-parser");
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const registerData = req.body;
   
    try {
        await authService.register(registerData);
        res.redirect('/');
    } catch(err) {
        const errorMessage = getErrorMessage(err);
        console.log(errorMessage)
    }
   
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const loginData = req.body;

    try {
        const token = await authService.login(loginData);
        res.cookie('auth', token);
        res.redirect('/');

    } catch(err) {
        const errorMessage = getErrorMessage(err);
        console.log(errorMessage)
    }

});


router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
});
module.exports = router;