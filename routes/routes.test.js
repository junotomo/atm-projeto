const { application } = require('express')
const express = require('express')
const controller = require('../controllers/controllers')
const router = express.Router()
const request = require('supertest');
const app = express()
    app.use('/atm', require('../routes/routes'));
describe('routes functions', () => {


    it('should return remaining bills when GET request is made to \'/atm/atmNotesNumber\'', () => {

        const controller = require('../controllers/controllers');
       

    
        request(app)
          .get('/atm/atmNotesNumber')
          .expect(200)
          .then((response) => {
            expect(response.body).toEqual(controller.getAtmRemainingBills());
          });
      });

    
    it('should return the account balance when accessing \'/atm/balance\' endpoint', () => { 
  
        request(app)
          .get('/atm/balance')
          .expect(200)
          .then((response) => {
            expect(response.body).toEqual(controller.getAccountBalance());
          });
      });

    
    it('should throw an error if the controller for \'/atm/atmNotesNumber\' endpoint is not defined', () => {  
        const req = {}
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        }
  
        expect(() => {
          router.get('/atm/atmNotesNumber', undefined)
        }).toThrow()
      });


    it('should throw an error if the controller for \'/atm/balance\' endpoint is not defined', () => {
        const req = {}
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        }
  
        expect(() => {
          router.get('/atm/balance', undefined)
        }).toThrow()
      });


    it('should throw an error if the controller for \'/atm/withdrawal\' endpoint is not defined', () => {
        const req = {}
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        }
  
        expect(() => {
          router.put('/atm/withdrawal', undefined)
        }).toThrow()
      });

      it('should return 405 status code when invalid HTTP method is used', () => {
    
        request(app)
          .post('/atm/atmNotesNumber')
          .expect(405);
      });

      it('should return 400 status code when invalid input is used', () => {

        request(app)
          .put('/atm/withdrawal')
          .send({ amount: 'invalid' })
          .expect(400);
      });
})