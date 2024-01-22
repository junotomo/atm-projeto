const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    pin: { type: Number, required: true },
    balance: { type: Number, required: true },
});

const atmSchema = new Schema({
    notes:{
        "100":{type: Number, default:0},
        "50":{type: Number, default:0},
        "20":{type: Number, default:0},
        "10":{type: Number, default:0}
    }
});

const clientModel = mongoose.model('client', clientSchema,'clients')
const atmModel = mongoose.model("data", atmSchema, 'clients')

module.exports = {atmModel,clientModel}