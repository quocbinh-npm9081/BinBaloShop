const backPack_model = require('../models/backPack');
class HomeController {
    async index(req, res) {
        const backPacks = await backPack_model.find({})
        res.render('home', {
            backPacks: backPacks,
        })
    }
    overViews(req, res) {
        backPack_model.findById(req.params._id, function(err, backPack) {
            if (!err) {
                res.render('overviews', { backPack: backPack });
            } else {
                console.log(err);
            }
        })

    }
}

module.exports = new HomeController;