const router = require('express').Router();
const movieService = require('../service/movieService');


router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const newMovie = req.body;  
    movieService.create(newMovie);
    res.redirect('/');
});
router.get('/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getOne(movieId);
    console.log(movie)

    movie.rating = new Array(movie.rating).fill(true);
    res.render('details', {movie});
});



module.exports = router;