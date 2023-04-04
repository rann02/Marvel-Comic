const { User, Purchase, Comment } = require('../models/index')

module.exports = {
    authorization: async (req, res, next) => {
        try {
            const { id } = req.params
            const purchase = await Purchase.findByPk(id)
            console.log(purchase);
            if (!purchase) {
                throw { name: "NotFound" }
            }

            const user = await User.findByPk(req.user.id)
            const userId = user.id

            if (userId === purchase.UserId) {
                next()
            } else {
                throw { name: "Forbiden" }
            }
        } catch (error) {
            if (error.name === "NotFound") {
                res.status(404).json({
                    message: 'Not Found'
                })
            } else if (error.name === "Forbiden") {
                res.status(403).json({
                    message: 'forbiden access'
                })
            } else {
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
        }
    },
    authorizationComment: async (req, res, next) => {
        try {
            const { id } = req.params
            const comment = await Comment.findByPk(id)

            if (!comment) {
                throw { name: "NotFound" }
            }

            const user = await User.findByPk(req.user.id)
            const userId = user.id

            if (userId === comment.UserId) {
                next()
            } else {
                throw { name: "Forbiden" }
            }
        } catch (error) {
            if (error.name === "NotFound") {
                res.status(404).json({
                    message: 'Not Found'
                })
            } else if (error.name === "Forbiden") {
                res.status(403).json({
                    message: 'forbiden access'
                })
            } else {
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
        }
    }
}