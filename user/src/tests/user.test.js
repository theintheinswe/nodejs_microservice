const request = require("supertest");
const express = require('express');
const app = express();
const { databaseConnection } = require('../database');
const expressApp = require('../express-app');

beforeAll(async () => await databaseConnection())

beforeAll(async () => await expressApp(app))

describe("POST /signup", () => {
    it("user signup ", async () => {
      const res = await request(app).post(`/signup`).send({
        name: "User 1",
        email: "user2@gmail.com",
        password: "1234567",
      }).set('Accept', 'application/json')
      .expect('Content-Type', /json/)
       expect(res.status.toString()).toMatch(/404|200/);
       expect(res.body && typeof res.body === 'object').toBe(true)
    });
});

describe("POST /signin", () => {
    it("user signin ", async () => {
      const res = await request(app).post(`/signin`).send({       
        email: "user2@gmail.com",
        password: "1234567",
      }).set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
       expect(res.body && typeof res.body === 'object').toBe(true)
    });
});