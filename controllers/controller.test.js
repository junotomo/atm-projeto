const {getAccountBalance, getAtmRemainingBills } = require('./controllers.js')
const {atmModel, clientModel}  = require('../models/schema.js')   
const notesFunctions = require('../utils/notes.js')

jest.mock('../models/schema.js')

// Mocking the models
jest.mock('../models/schema.js', () => ({
  atmModel: {
    find: jest.fn(),
  },
  clientModel: {
    find: jest.fn(),
  },
}));

global.console = {
    log: jest.fn(),
    info: jest.fn(),
  };

describe('getAtmRemainingBills function', () => {
  test('should return ATM remaining bills data', async () => {
    const atmData = [
      {
        notes: {
          "100": 5,
          "50": 10,
          "20": 20,
          "10": 30
        }
      }
    ];

    atmModel.find.mockResolvedValue(atmData);
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getAtmRemainingBills(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      "number of notes": {
        "100": 5,
        "50": 10,
        "20": 20,
        "10": 30,
      }
    });
  });

  test('should handle error properly', async () => {
    const errorMessage = 'Error finding ATM data';
    atmModel.find.mockRejectedValue(errorMessage);
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getAtmRemainingBills(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });
});

describe('getAccountBalance function', () => {
    // Returns a JSON object with the client's PIN and balance
    it('should return a JSON object with the clients PIN and balance', async () => {
      // Mock client data
      const clientData = [
        { pin: '1234', balance: 100 },
        { pin: '5678', balance: 200 }
      ]
  
      // Mock find function of clientModel
      clientModel.find = jest.fn().mockResolvedValue(clientData)
  
      // Mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
  
      // Call getAccountBalance function
      await getAccountBalance({}, res)
  
      // Assertion
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        pin: clientData[1].pin,
        balance: clientData[1].balance
      })
    })

  test('should handle error properly', async () => {
    const errorMessage = 'Error finding client data';
    clientModel.find.mockRejectedValue(errorMessage);
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getAccountBalance(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith(errorMessage);
  });
});


it('should handle error properly when getAccountBalance is called', async () => {
  const errorMessage = 'Error finding client data';
  clientModel.find.mockRejectedValue(errorMessage);
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  await getAccountBalance(req, res);

  expect(res.status).not.toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();
  expect(console.info).toHaveBeenCalledWith(errorMessage);
});

