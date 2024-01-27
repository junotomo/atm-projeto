const { application } = require('express')
const express = require('express')
const controller = require('../controllers/controllers')

const router = express.Router()

router.get('/atm/atmNotesNumber', controller.getAtmRemainingBills)
router.get('/atm/balance', controller.getAccountBalance)
router.put('/atm/withdrawal', controller.withdrawalAccountMoney)

module.exports = router