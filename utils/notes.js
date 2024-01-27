const {atmModel, clientModel} = require('../models/schema.js')

const splitNotes = (desiredAmount, notesTypes) => {
    const output = {}
    let rest = desiredAmount

    if(desiredAmount < 0){
      rest = -1
      return rest
    }

    for (let note of notesTypes) {
      output[note] = Math.floor(rest / note)
      rest -= output[note] * note
    }

    return {rest, ...output}
}

  
const  listOfNotes = (notes) => {
    let output = []
  
    for (let note in notes) {
      if (note !== 'rest') {
        let quantity = notes[note]
        while (quantity--) output.push(Number.parseInt(note))
      }
    }
    return output
}


const calculateNewBalance = async (accountPin, amount) => {
    try {
      const clientUpddate = await clientModel.findOne(accountPin)
      let updatedAccountBalance = clientUpddate.balance - amount
      
      return updatedAccountBalance
    } catch (e) {
      console.error(e)
    }
}  


const verifyNotesNumberIsNotNegative = async  (notes) => {
    try {
      let atmNotes = await atmModel.find()
      let notesUpdated = Object.keys(atmNotes[0].notes).reduce((a, k) => {
          a[k] = atmNotes[0].notes[k] - notes[k]
          return a
      }, {})

      for( const [key, value] of Object.entries(notesUpdated)){
        if (value < 0) {
         return {}
        }
      } 

      return notesUpdated
    } catch (e) {
      console.log(e)
      return {}
    }
}
  
  module.exports = { splitNotes, listOfNotes, calculateNewBalance, verifyNotesNumberIsNotNegative } 