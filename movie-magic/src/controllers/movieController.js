const router = require('express').Router();

router.use('/create', (req, res) => {
    res.render('create');
})

module.exports = router;