const request = require("supertest");
const express = require('express');
const app = express();
const { databaseConnection } = require('../database');
const expressApp = require('../express-app');

beforeAll(async () => await databaseConnection())

beforeAll(async () => await expressApp(app))

describe("GET /:id", () => {
    it("Get comments ", async () => {
      const res = await request(app).get('/6433853c666066a186118f1e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);      
    });
});

describe("POST /create", () => {
  it("Create comment ", async () => {
    const res = await request(app).post('/create')
    .send({       
      postId: "6433853c666066a186118f1e",
      desc: "Testing",
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(403);    
  });
});

describe("DELETE /:id", () => {
  it("Delete comment ", async () => {
    const res = await request(app).delete('/6433853c666066a186118f1e')   
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(403);    
  });
});