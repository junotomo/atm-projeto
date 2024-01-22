const controller = require('../controllers/controllers')
const {atmModel, clientModel}  = require('../models/schema.js')   
const notesFunctions = require('../utils/notes.js')

jest.mock('../models/schema.js')

const request = {
    body: {
        pin : 777,
        balance: 1000
    }   
}

const response = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
    send: jest.fn((x) => x)
}
const withdrawRequest = {
    body: {
        pin : 777,
        amount: -80
    } 
}

test("test get client data", async () => {
    clientModel.findOne.mockImplementationOnce(() => ({
        "pin": 777,
        "balance": 1000
    }))
    await controller.getBalance(request, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).not.toEqual(null)
})

test("test get atm data", async () => {
    atmModel.findOne.mockImplementationOnce(() => ({  }))
    await controller.getData(request, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).not.toEqual(null)
})

test("test to try to withdraw using negative number", async () => {
    const atm = atmModel.findOne.mockImplementationOnce(() => ({ 
            "notes": {"100": 100, "50": 50, "20":200, "10": 100}                    
        }))
        console.log(atm.notes)
    clientModel.findOne.mockImplementationOnce(() => ({
        "pin": 777,
        "balance": 1000
    }))
    
    const body = withdrawRequest.body
    const amount = body.amount
    const notesTypes = [100, 50,20,10]
    const dividedNotes = notesFunctions.splitNotes(amount,notesTypes)
    await controller.withdrawal(withdrawRequest, response)
    expect(dividedNotes.rest === 0).toBeFalsy()
    expect(response.status).toHaveBeenCalledWith(400)
})

test("test with number non divisible", async () => {
    const atm = atmModel.findOne.mockImplementationOnce(() => ({ 
            "notes": {"100": 100, "50": 50, "20":200, "10": 100}                    
        }))
        console.log(atm.notes)
    clientModel.findOne.mockImplementationOnce(() => ({
        "pin": 777,
        "balance": 1000
    }))
    
    const amount = 23
    const notesTypes = [100, 50,20,10]
    const dividedNotes = notesFunctions.splitNotes(amount,notesTypes)
    await controller.withdrawal(withdrawRequest, response)
    expect(dividedNotes.rest === 0).toBeFalsy()
    expect(response.status).toHaveBeenCalledWith(400)
})
