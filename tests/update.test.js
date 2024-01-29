

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
    // The test should verify that the function updateAtmAndAccountBalance correctly updates both the clientModel balance and the atmModel notes. It should return the newBalance and newCashQtd values.
    // updateAtmAndAccountBalance returns newBalance and newCashQtd
    it('should return newBalance and newCashQtd when updateAtmAndAccountBalance is called', async () => {
        const pin = '1234';
        const amount = 100;
        const dividedNotes = { '10': 2, '20': 3, '50': 1, '100': 4 };
        const newBalance = 0;
        const newCashQtd = { '10': 10, '20': 10, '50': 10, '100': 10 };
  
        jest.mock('../models/schema.js', () => ({
          atmModel: {
            findOneAndUpdate: jest.fn().mockResolvedValue(),
          },
          clientModel: {
            findOneAndUpdate: jest.fn().mockResolvedValue(),
          },
        }));
  
        jest.mock('../utils/notes.js', () => ({
          calculateNewBalance: jest.fn().mockResolvedValue(newBalance),
          verifyNotesNumberIsNotNegative: jest.fn().mockResolvedValue(newCashQtd),
        }));
    
        const result = await updateAtmAndAccountBalance(pin, amount, dividedNotes);
  
        expect(result).toEqual({ newBalance, newCashQtd });
      });

    })