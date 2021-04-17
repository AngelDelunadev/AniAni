var express = require('express');
const { DataTypes } = require('sequelize/types');
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
        malId: req.body.mal_id,
        title: req.body.title,
        ImageUrl: req.body.image_url,
        type: req.body.type,
        aired: req.body.aired,
        UserId: req.session.user.id
    })

    res.status(201).json(favorite)
})

module.exports = router;
