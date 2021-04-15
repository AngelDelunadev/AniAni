var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/anime/top',async function(req, res, next) {
    const response = await  axios.get("https://api.jikan.moe/v3/top/anime/1/")
        res.json(response.data.top)
});

router.get('/single/:id',async function(req, res, next) {
    const response = await  axios.get(`https://api.jikan.moe/v3/anime/${req.params.id}`)
        res.json(response.data)
});

module.exports = router;