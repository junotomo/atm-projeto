const request = require('supertest')
const express = require('express')
const app = express()
const atmRoutes = require('./routes/routes.js')
const PORT = process.env.PORT || 3000

it('should start listening on the specified port', () => {
    const appListenSpy = jest.spyOn(app, 'listen')
    expect(appListenSpy).toHaveBeenCalledWith(PORT, expect.any(Function))
})

