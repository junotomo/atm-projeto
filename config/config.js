const mongoose = require('mongoose')
const {atmModel, clientModel} = require('../models/schema.js')
const uri = process.env.MONGODB_URI

const client = {
    pin: 777,
    balance: 10000
}

const notesObj = {
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

        clientModel.create(client).then((createdClient) => {

          })
          .catch((error) => {
            console.error('Error creating Client:', error)
        })
        
        atmModel.create(notesObj).then((createdNotes) => {
            console.log('Notes created:', createdNotes)
          })
          .catch((error) => {
            console.error('Error creating Notes:', error)
        })
    }      
}
