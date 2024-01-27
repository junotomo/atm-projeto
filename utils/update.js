const {atmModel, clientModel} = require('../models/schema.js')
const {calculateNewBalance, verifyNotesNumberIsNotNegative} = require('./notes.js')

const updateAtmNotesNumber = async (dividedNotes) => {
    try {
      const updatedNotesNumbers = await verifyNotesNumberIsNotNegative(dividedNotes)
        if (updatedNotesNumbers != {}) {
          await atmModel.findOneAndUpdate({}, {"notes": updatedNotesNumbers})
        }

        return updatedNotesNumbers
      
    } catch (e) {
        console.error(e)
    }
}


const updateClientAccountBalance =  async (pin,amount) => {
    try {
      let filter ={"pin": pin}
      let newAccaountBalance = await calculateNewBalance(filter,amount)
      if (newAccaountBalance > 0) {
          await clientModel.findOneAndUpdate({"pin": pin },{"balance": newAccaountBalance} )
      }
      return newAccaountBalance
    } catch (e) {
        console.info(e)
    }
}


const updateAtmAndAccountBalance = async (pin, amount,dividedNotes) => {
    try {
        const newBalance = await updateClientAccountBalance(pin, amount)
        const newCashQtd = await updateAtmNotesNumber(dividedNotes)
        return {newBalance, newCashQtd}
    } catch (error) {
        console.error(error)
    }
}





module.exports = { updateClientAccountBalance, updateAtmNotesNumber, updateAtmAndAccountBalance } 