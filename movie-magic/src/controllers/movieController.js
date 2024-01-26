const router = require('express').Router();
const movieService = require('../service/movieService');


router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const newMovie = req.body;  
    movieService.create(newMovie);
    console.log(req.body);

    res.redirect('/');
})



module.exports = router;