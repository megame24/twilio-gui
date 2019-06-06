const request = require('supertest');
const app = require('../../index');

describe('Auth routes', () => {
  describe('Making a POST request to /auth', () => {
    it('Should return error 401 if the password is incorrect', (done) => {
      request(app)
        .post('/api/auth')
        .send({
          phoneNumber: '+1234567890',
          password: 'wrong_password',
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('Incorrect password');
          done();
        });
    });

    it('Should authenticate the user if the password is correct', (done) => {
      request(app)
        .post('/api/auth')
        .send({
          phoneNumber: '+1234567890',
          password: 'test_password',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty('token');
          done();
        });
    });
  });
});
