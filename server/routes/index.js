const express = require('express')
const router = express.Router()
const user = require('./userRoute')
const book = require('./book')
const purchase = require('./purchase')
const comment = require('./comment')
const authentication = require('../middleware/authen')
const Cotroller = require('../controllers/commentController')


// define the home page route
router.use('/users', user)
router.use('/books', book)
router.get('/comments/:id', Cotroller.getComment)
router.use(authentication)
router.use('/comments', comment)
router.use('/purchases', purchase)


module.exports = router

// &nbsp;
