const router = require('express').Router();
const electronicsService = require('../services/electronicsService');
const { authMiddleware } =  require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/createOffer', (req, res) => {
    res.render('electronics/create');
});

router.post('/createOffer', async (req, res) => {
    const offer = req.body;
    
    try{
        await electronicsService.createOffer(offer, req.user.userId);
        res.redirect('/electronics/catalog')

    } catch(err) {
        console.log(getErrorMessage(err));
    }
    
});

router.get('/catalog', async (req, res) => {
    const electronics = await electronicsService.getAll().lean();
    
    res.render('electronics/catalog',  {electronics});
});
//SEARCH
router.get('/search', async (req, res) => {
  
    const {searchName, searchType} = req.query;
    const electronics = await electronicsService.search(searchName, searchType).lean();
    console.log(electronics)
    
    res.render('electronics/search', {electronics, searchName, searchType});
});

router.get('/details/:electronicsId', async (req, res) =>{
    const detailView = req.params.electronicsId;
    const owner = await electronicsService.getAll();
    //const isOwner = owner.owner && 
    res.render ('electronics/details', {detailView})
});


module.exports = router;