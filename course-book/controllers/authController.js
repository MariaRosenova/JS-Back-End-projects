const router = require("express").Router();
const cookieParser = require('cookie-parser');
const authService = require("../services/AuthService");


router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const loginData = req.body;

  try {
    const token = await authService.login(loginData);
   
    res.cookie('auth', token);

    res.redirect("/");
  } catch (err){
    
    

    res.status(400).render('auth/login', {err});
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const registerData = req.body;
  await authService.createUser(registerData);

  res.redirect("/");
});

router.get("/logout", (req, res) => {
    res.clearCookie('auth');

    res.redirect('/')
});

module.exports = router;
