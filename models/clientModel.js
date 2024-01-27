const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    pin: { type: Number, required: true },
    balance: { type: Number, required: true },
});



const clientModel = mongoose.model('client', clientSchema,'clients')


module.exports = {clientModel}