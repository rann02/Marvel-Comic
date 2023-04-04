const { Comment } = require('../models/index')

class Cotroller {
    static async getComment(req, res, next) {
        try {
            const {id} = req.params
            const data = await Comment.findAll({
                where: {
                    'BookId': id
                }
            })
            // console.log(data)

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async postComment(req, res, next) {
        try {
            const {id} = req.params
            const {commentText} = req.body
            const UserId = req.user.id
            const avatar =req.user.avatar

            const data = await Comment.create({UserId, 'BookId': id, commentText, avatar})

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getCommentById (req, res, next){
        try {
            const { id } = req.params

            const comment = await Comment.findByPk(id)

            if(!comment){
                throw { name: 'NotFound' }
            }

            res.status(200).json(comment)
        } catch (error) {
            next(error)
        }
    }

    static async editComment (req, res, next) {
        try {
            const { id } = req.params
            const { commentText } = req.body

            const data = await Comment.update({commentText}, {where: {id}})

            res.status(200).json({message: "Edit successfully"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Cotroller
