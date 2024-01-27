const {
  splitNotes,
  listOfNotes,
  calculateNewBalance,
  verifyNotesNumberIsNotNegative 
} = require('../utils/notes.js')

jest.mock('../models/schema.js', () => ({
  atmModel: {
    find: jest.fn(),
  },
  clientModel: {
    findOne: jest.fn(),
  },
}))

describe('splitNotes function', () => {
  test('should correctly split desired amount into notes', () => {
    const desiredAmount = 230
    const notesTypes = [100, 50, 20, 10]
    const expectedOutput = { rest: 0, '100': 2, '50': 0, '20': 1, '10': 1 }

    expect(splitNotes(desiredAmount, notesTypes)).toEqual(expectedOutput)
  })

  test('should return -1 if desired amount is negative', () => {
    const desiredAmount = -100
    const notesTypes = [100, 50, 20, 10]

    expect(splitNotes(desiredAmount, notesTypes)).toBe(-1)
  })
})

describe('listOfNotes function', () => {
  test('should correctly generate list of notes from object', () => {
    const notes = { '100': 2, '50': 1, '20': 1, '10': 0 }
    const expectedOutput = [20, 50, 100, 100]

    expect(listOfNotes(notes)).toEqual(expectedOutput)
  })
})

describe('calculateNewBalance function', () => {
  test('should calculate new balance correctly', async () => {

    const clientModel = require('../models/schema.js').clientModel
    clientModel.findOne.mockResolvedValue({ balance: 1000 })

    const accountPin = '1234'
    const amount = 100
    const expectedNewBalance = 900

    expect(await calculateNewBalance(accountPin, amount)).toEqual(expectedNewBalance);
  })
})

describe('verifyNotesNumberIsNotNegative function', () => {
  test('should verify notes correctly and return updated notes if not negative', async () => {
    const atmModel = require('../models/schema.js').atmModel
    atmModel.find.mockResolvedValue([{ notes: { '100': 5, '50': 3, '20': 2, '10': 0 } }])

    const notes = { '100': 2, '50': 1, '20': 1, '10': 0 }
    const expectedUpdatedNotes = { '100': 3, '50': 2, '20': 1, '10': 0 }

    expect(await verifyNotesNumberIsNotNegative(notes)).toEqual(expectedUpdatedNotes)
  })
})
