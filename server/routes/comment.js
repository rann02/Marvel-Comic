const express = require('express')
const router = express.Router()
const Cotroller = require('../controllers/commentController')
const { authorizationComment } = require('../middleware/author')

router.post('/:id', Cotroller.postComment)
router.get('/edit/:id', Cotroller.getCommentById)
router.patch('/edit/:id', authorizationComment, Cotroller.editComment)


module.exports = router