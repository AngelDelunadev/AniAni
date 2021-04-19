var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const models = require('../models')
router.get('/',checkAuth, async function  (req, res) {
    const favorites = await models.Favorite.findAll({
        include: [{
            model: models.User, 
            attributes: ['username', "id"]
        }]
    })

    res.json(favorites)
});


router.post('/',checkAuth, async(req,res) => {
    const favorite = await models.Favorite.create({
        malId: req.body.malId,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        type: req.body.type,
        aired: req.body.aired,
        UserId: req.session.user.id
    })

    res.status(201).json(favorite)
})

// router.delete('/',checkAuth, async(req,res) => {
//     models.Favorite.remove()


// })

module.exports = router;
