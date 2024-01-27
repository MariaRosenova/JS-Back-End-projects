const router = require('express').Router();

const movieService = require('../service/movieService');

router.get('/', (req, res) => {
    const movies = movieService.getAll();
    res.render('home', {movies});
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/details/:')

module.exports = router;