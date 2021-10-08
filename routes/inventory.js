const express = require('express')
const inventoryController = require('../controllers/inventoryController')
const router = express.Router()

router.post('/subscribeDefault', inventoryController.subscribeToAllCodeby)
router.post('/subscribe', inventoryController.subscribeToAll)

module.exports = router