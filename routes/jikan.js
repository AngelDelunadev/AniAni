var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/anime/:type',async function(req, res, next) {
    if(req.params.type === "1"){
        const response = await  axios.get(`https://api.jikan.moe/v3/top/anime/1`)
        res.json(response.data.top)
    }
    else{
        const response = await  axios.get(`https://api.jikan.moe/v3/top/anime/1/${req.params.type}`)
            res.json(response.data.top)
    }
});

router.get('/single/:id',async function(req, res, next) {
    const response = await  axios.get(`https://api.jikan.moe/v3/anime/${req.params.id}`)
        res.json(response.data)
});

router.get('/search/anime/:title' , async function (req,res,next){
    const response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${req.params.title}&page=1`)
        res.json(response.data.results)
})

module.exports = router;