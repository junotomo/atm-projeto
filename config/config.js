const mongoose = require('mongoose')
const {atmModel, clientModel} = require('../models/schema.js')
const uri = process.env.MONGODB_URI

const clientAccountData = {
    pin: 777,
    balance: 10000
}

const notesTypes = {
    notes: {
        "100":200,
        "50":200,
        "20":200,
        "10":200 
    }
}

mongoose.connect(uri)
    .then(() => {
        populateBD()
        console.log("Success on connecting with MongoDB")
    })
    .catch(err => {
        console.log("Error")
})

const populateBD = async () => {
    
    let collectionData = await atmModel.find()

    if (Object.keys(collectionData).length === 0) {

        clientModel.create(clientAccountData).then((createdClient) => {

          })
          .catch((error) => {
            console.error('Error creating Client:', error)
        })
        
        atmModel.create(notesTypes).then((createdNotes) => {
            console.log('Notes created:', createdNotes)
          })
          .catch((error) => {
            console.error('Error creating Notes:', error)
        })
    }      
}
