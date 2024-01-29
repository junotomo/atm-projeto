const mongoose = require('mongoose');
const {atmModel, clientModel} = require('../models/schema.js');
const uri = process.env.MONGODB_URI;
const db = mongoose.connection;

const clientAccountData = {
    pin: 777,
    balance: 10000
};

const notesTypes = {
    notes: {
        "100":200,
        "50":200,
        "20":200,
        "10":200 
    }
};
it('should connect to MongoDB and log a success message', () => {

    const consoleLogSpy = jest.spyOn(console, 'log');

    return mongoose.connect(uri)
      .then(() => {
        populateBD();
        expect(consoleLogSpy).toHaveBeenCalledWith("Success on connecting with MongoDB");
      })
      .catch(err => {
        console.log("Error");
      });
})

// Populates the database with client account data and notes types if the database is empty
it('should populate the database with client account data and notes types if the database is empty', () => {
  
        const atmModelFindSpy = jest.spyOn(atmModel, 'find').mockResolvedValue([]);
  
        const clientModelCreateSpy = jest.spyOn(clientModel, 'create').mockResolvedValue();
  
        const atmModelCreateSpy = jest.spyOn(atmModel, 'create').mockResolvedValue();
  
        return mongoose.connect(uri)
          .then(() => {
            populateBD();
            expect(atmModelFindSpy).toHaveBeenCalled();
            expect(clientModelCreateSpy).toHaveBeenCalledWith(clientAccountData);
            expect(atmModelCreateSpy).toHaveBeenCalledWith(notesTypes);
          })
          .catch(err => {
            console.log("Error");
          });
      });

    // Collection data is not empty, does not create client account data or notes types
it('should not create client account data or notes types if collection data is not empty', () => {
      const atmModelFindSpy = jest.spyOn(atmModel, 'find').mockResolvedValue([{data: 'data'}]);

      const clientModelCreateSpy = jest.spyOn(clientModel, 'create').mockResolvedValue();

      const atmModelCreateSpy = jest.spyOn(atmModel, 'create').mockResolvedValue();

      return mongoose.connect(uri)
        .then(() => {
          populateBD();
          expect(atmModelFindSpy).toHaveBeenCalled();
          expect(clientModelCreateSpy).not.toHaveBeenCalled();
          expect(atmModelCreateSpy).not.toHaveBeenCalled();
        })
        .catch(err => {
          console.log("Error");
        });
});
