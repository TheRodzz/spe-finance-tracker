const request = require('supertest');
const index = require('../app');
const mongoose = require("mongoose");
const { expect, assert } = require('chai');

const app = index.app;

describe('POST /register', () => {
    it('attempts to create an existing user', (done) => {
      request(app)
        .post('/register')
        .send({
          name: 'Arya',
          username: 'test12@gmail.com',
          password: '1234',
        })
        .expect(200)
        done();
    });
});

describe('POST /login', () => {
  it('attempts to login an existing user', (done) => {
    request(app)
      .post('/login')
      .send({
        name: 'Arya',
        username: 'test12@gmail.com',
        password: '1234',
      })
      .expect(200)
      done();
  });
});

describe('POST /api/v1/add-income', () => {
  it('attempts to add an expense for user', (done) => {
    request(app)
      .post('/api/v1/add-income')
      .send({
        username: 'test12@gmail.com',
        title: 'test1',
        amount: 1000,
        category: 'freelancing',
        description: 'testing',
        date: '12/07/2023',
      })
      .expect(200)
      done();
  });
});

describe('POST /api/v1/add-expense', () => {
  it('attempts to add an expense for user', (done) => {
    request(app)
      .post('/api/v1/add-expense')
      .send({
        username: 'test12@gmail.com',
        title: 'test1',
        amount: 500,
        category: 'groceries',
        description: 'testing',
        date: '12/07/2023',
      })
      .expect(200)
      done();
  });
});

describe('POST /api/v1/add-income', () => {
  it('attempts to add an expense for user', (done) => {
    request(app)
      .post('/api/v1/add-income')
      .send({
        username: 'test12@gmail.com',
        title: 'test1',
        amount: -1000,
        category: 'freelancing',
        description: 'testing',
        date: '12/07/2023',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.message, 'Amount must be a positive number!');
        done();
      });
  });
});


  describe('POST /api/v1/add-expense', () => {
    it('attempts to add an expense for user', (done) => {
      request(app)
        .post('/api/v1/add-expense')
        .send({
          username: 'test12@gmail.com',
          title: 'test1',
          amount: -1000,
          category: 'groceries',
          description: 'testing',
          date: '12/07/2023',
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Amount must be a positive number!');
          done();
        });
    });  
});