

const { atmModel, clientModel } = require('../models/schema.js')
const { calculateNewBalance, verifyNotesNumberIsNotNegative } = require('../utils/notes.js')
const {
    updateClientAccountBalance,
    updateAtmNotesNumber,
    updateAtmAndAccountBalance
} = require('../utils/update.js')


jest.mock('../models/schema.js')
jest.mock('../utils/notes.js')

describe('updateClientAccountBalance', () => {
    it('should update client account balance correctly', async () => {
        const pin = '777';
        const amount = 100;
        const filter = { pin }
        const newBalance = 500

        calculateNewBalance.mockResolvedValue(newBalance)
        await updateClientAccountBalance(pin, amount)

        expect(clientModel.findOneAndUpdate).toHaveBeenCalledWith({ pin }, { balance: newBalance })
    })

    it('should not update client account balance if new balance is not positive', async () => {
        const pin = 777
        const amount = 100
        const filter = { pin }
        const newBalance = 0
        calculateNewBalance.mockResolvedValue(newBalance)
        await updateClientAccountBalance(pin, amount)
        expect(clientModel.findOneAndUpdate).not.toHaveBeenCalled()
    })
})

describe('updateAtmNotesNumber', () => {
    it('should update ATM notes numbers correctly', async () => {
        // Mock the return value of verifyNotesNumberIsNotNegative
        const dividedNotes = { '10': 2, '20': 3, '50': 1, '100': 4 }
        const updatedNotesNumbers = { '10': 1, '20': 2, '50': 0, '100': 3 }
        verifyNotesNumberIsNotNegative.mockResolvedValue(updatedNotesNumbers)

        // Call the function being tested
        await updateAtmNotesNumber(dividedNotes)

        // Verify that atmModel.findOneAndUpdate is called with correct parameters
        expect(atmModel.findOneAndUpdate).toHaveBeenCalledWith({}, { notes: updatedNotesNumbers })
    })
})

describe('updateAtmAndAccountBalance', () => {
    it('should update ATM and account balances correctly', async () => {
        const pin = 777
        const amount = 100
        const dividedNotes = { '10': 2, '20': 3, '50': 1, '100': 4 }
        const newBalance = 900;
        const newCashQtd = { "10": 1, "20": 2, "50": 0, "100": 3 }

        const result = await updateAtmAndAccountBalance(pin, amount, dividedNotes)
        const resultBalance = result.newBalance
        const resultCashQtd = result.newCashQtd
        expect({resultBalance,resultCashQtd}).toEqual({ newBalance, newCashQtd })
    })
})