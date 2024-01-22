const { application } = require('express')
const express = require('express')
const controller = require('../controllers/controllers')

const router = express.Router()

router.get('/atm/atmData', controller.getData)
router.get('/atm/balance', controller.getBalance)
router.put('/atm/withdrawal', controller.withdrawal)

module.exports = router