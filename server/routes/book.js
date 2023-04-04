const express = require('express')
const router = express.Router()
const Cotroller = require('../controllers/bookController')

// define the home page route
router.get('/lists', Cotroller.getBook)
router.get('/:id', Cotroller.getBookById)


module.exports = router

