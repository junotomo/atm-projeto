const {atmModel, clientModel} = require('../models/schema.js')
const {splitNotes} = require('../utils/notes.js')
const {updateAtmAndAccountBalance} = require('../utils/update.js')

const getAtmRemainingBills = async (req, res) => {
    try {
        const atm = await atmModel.find()
        res.status(200).json({
               "number of notes": {
                    "100": atm[0].notes["100"],
                    "50": atm[0].notes["50"],
                    "20": atm[0].notes["20"],
                    "10": atm[0].notes["10"],
                 }                    
         })
    }
    catch (e) {
        console.log(e)
    }
}


const getAccountBalance = async (req, res) => {
    try {
        const clientData = await clientModel.find()
        res.status(200)
        res.json({
            "pin": clientData[1].pin,
            "balance": clientData[1].balance,                    
        })
    }
    catch (e) {
        console.info(e)
    }
}


const withdrawalAccountMoney = async (req, res) => {
    try {
        const body = req.body
        const amount = body.amount
        const pin = body.pin
        const atm = await atmModel.find()
        const notesTypes = Object.keys(atm[0].notes).reverse()
        const dividedNotes = splitNotes(amount,notesTypes)

        if (dividedNotes.rest === 0 ) {
            const updatedValues  = await updateAtmAndAccountBalance(pin, amount,dividedNotes)
            delete dividedNotes.rest
            const updateAtm = {
                "receividNotes": dividedNotes,
                "newBalance": updatedValues.newBalance,
                "newCashQtd": updatedValues.newCashQtd
            } 
            res.status(200)
            res.send(updateAtm)
        } else if(dividedNotes.rest != 0){
            res.status(400)
            res.send('Amount needs to be dividable by 10 or positive')
        }

    }catch(e) {
        res.status(400)
        console.info(e)
    }
}

module.exports = {withdrawalAccountMoney, getAtmRemainingBills, getAccountBalance}