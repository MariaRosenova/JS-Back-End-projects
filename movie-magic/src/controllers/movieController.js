const router = require('express').Router();
const movieService = require('../service/movieService');
const castService = require('../service/castService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;
    
    try{
        console.log(newMovie)
        await movieService.create(newMovie);

        res.redirect('/');

    } catch(err) {
        console.log(err.message);
        res.redirect('/create');
        res.status(400).end();
        
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    
    movie.rating = new Array(Number(movie.rating)).fill(true);
    
    res.render('details', { movie });
});

router.get('/movies/:movieId/attach', async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    
    const casts = await castService.getAll();

    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', async (req, res) => {

    const castId = req.body.cast.replace(/^Cast\s+/i, '');

    await movieService.attach(req.params.movieId, castId);

    res.redirect(`/movies/${req.params.movieId}/attach`);
});

module.exports = router;