const request = require("supertest");
const express = require('express');
const app = express();
const { databaseConnection } = require('../database');
const expressApp = require('../express-app');

beforeAll(async () => await databaseConnection())

beforeAll(async () => await expressApp(app))

describe("GET /", () => {
    it("Get Posts ", async () => {
      const res = await request(app).get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);      
    });
});

describe("POST /search", () => {
  it("Search Posts ", async () => {
    const res = await request(app).post('/search')
    .send({       
      filter: "Lorem",     
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);    
    expect(res.body && typeof res.body === 'object').toBe(true)  
  });
});

describe("GET /", () => {
  it("Get Post by id ", async () => {
    const res = await request(app).get('/6432e196dfe3c50cdbfdbb99')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);      
  });
});

describe("POST /post/create", () => {
  it("Create post ", async () => {
    const res = await request(app).post(`/post/create`).send({       
      title: "Lorem ipsum dolor sit amet",
      desc: "Sed dignissim, felis eu euismod luctus, ante odio tempus leo, iaculis elementum libero risus ut ligula. Vivamus vehicula, lorem vitae semper volutpat, sapien leo malesuada arcu, sed fermentum sapien massa ac risus.",
      imgUrl:"",
      tags:[]
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(403);
  });
});