const router = require('express').Router();
const castService = require('../service/castService');


router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;
    console.log(castData);
    
    try {
        await castService.create(castData);
        
        res.redirect('/')
        console.log('Add cast successfully')
    }
    catch(err) {
      
        console.log(err.message);
        console.log('Unsuccessfully added cast')
        res.redirect('cast/create')
    }
});

module.exports = router;