const express = require('express')
const router = express.Router()
const Cotroller = require('../controllers/purchaseController')
const { authorization } = require('../middleware/author')

// define the home page route
router.get('/', Cotroller.getPurchase)
router.post('/midtrans', Cotroller.generateMidtransToken)
// router.post('/send', Cotroller.sendMeil)
router.patch('/status', Cotroller.patchPaymentstatus)
router.post('/:BookId', Cotroller.postPurchase)
router.delete('/:id', authorization, Cotroller.deletePurchase)




module.exports = router