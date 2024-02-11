const router = require("express").Router();
const cookieParser = require('cookie-parser');
const authService = require("../services/AuthService");
const { getErrorMessage } = require('../utils/errorUtils');


router.get("/login", (req, res) => {
 
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
    const loginData = req.body;

    try {
      const token = await authService.login(loginData);
     
      res.cookie('auth', token);
      res.redirect('/');
  
    } catch (err) {
      const message = getErrorMessage(err);
    
      res.render('auth/login', {...loginData, error: message});
    }
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const registerData = req.body;
  try {

      await authService.createUser(registerData);
      res.redirect('/login')
  } catch(err) {
    const message = getErrorMessage(err);
    
    res.render('auth/register', {...registerData, error: message});
  }


});

router.get("/logout", (req, res) => {
    res.clearCookie('auth');

    res.redirect('/')
});

module.exports = router;
