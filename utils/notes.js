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
        let n = notes[note]
        while (n--) output.push(Number.parseInt(note))
      }
    }
    return output
  }

const updateBalance =  async (pin,amount) => {
    try {
        let filter ={"pin": pin}
        let update = {}
        const clientUpddate = await clientModel.findOne(filter)
        update = clientUpddate.balance - amount
        if (update < 0) throw new Exception ("Not enough cash in your account.")
        let clientUpdate = await clientModel.findOneAndUpdate({"pin": pin },{"balance": update} )

    } catch (e) {
        console.info(e.message)
    }
  }
  
const updateNotes = async (dividedNotes) => {
    try {
        let atmNotes = await atmModel.find()
        let notesUpdated = Object.keys(atmNotes[0].notes).reduce((a, k) => {
            a[k] = atmNotes[0].notes[k] - dividedNotes[k]
            return a
        }, {})

        for( const [key, value] of Object.entries(notesUpdated)){
            if (value < 0) throw new Exception("no more notes of"+key)
        }       

        let atmUpdate = await atmModel.findOneAndUpdate({}, {"notes": notesUpdated}) 

    } catch (e) {
        console.error(e.message)
    }
  }
  
  module.exports = { splitNotes, listOfNotes, updateBalance, updateNotes } 