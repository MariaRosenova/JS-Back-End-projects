const router = require('express').Router();

const authService = require('../services/AuthService');
router.get('/login', (req, res) => {
    res.render('auth/login');
    
});

router.get('/register', (req, res) => {
    res.render('auth/register');
    
});

router.post('/register', async (req, res) => {
    const registerData = req.body;
    await authService.createUser(registerData);

    res.redirect('/');
});
module.exports = router;