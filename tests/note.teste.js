const controller = require('../controllers/controllers')
const {atmModel, clientModel}  = require('../models/schema.js')   
const notesFunctions = require('../utils/notes.js')

jest.mock('../models/schema.js')

const response = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
    send: jest.fn((x) => x)
}

test("test balance update with negative result ", async () => {
    clientModel.findOne.mockImplementationOnce(() => ({
        "pin": 777,
        "balance": 1000
    }))
    await clientModel.findOne(filter)
    let update = clientUpddate.balance - 99999
    await expect(async () => {
        await clientModel.findOneAndUpdate({"pin": 777 },{"balance": update} )
    }).rejects.toThrowError()

})


test("test if it will update with zero notes in the atm ", async () => {
    clientModel.findOne.mockImplementationOnce(() => ({
        "pin": 777,
        "balance": 1000
    }))
    await clientModel.findOne(filter)
    let update = clientUpddate.balance - 99999
    await expect(async () => {
        await clientModel.findOneAndUpdate({"pin": 777 },{"balance": update} )
    }).rejects.toThrowError()

})