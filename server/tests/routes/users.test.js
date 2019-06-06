const request = require('supertest');
const app = require('../../index');
const { User } = require('../../database/models');

let token;
let id;
let contactId;

describe('Users routes', () => {
  beforeAll((done) => {
    request(app)
      .post('/api/auth')
      .send({
        phoneNumber: '+1234567890',
        password: 'test_password',
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  beforeAll(async (done) => {
    const user = await User.findOne({ where: { phoneNumber: '+1234567890' } });
    id = user.dataValues.id;
    done();
  });

  beforeAll(async (done) => {
    await request(app)
      .post('/api/messages/receive')
      .send({
        From: '+11111111111',
        Body: 'Hello',
        To: '+1234567890',
      });
    done();
  });

  beforeAll(async (done) => {
    const user = await User.findOne({ where: { phoneNumber: '+11111111111' } });
    contactId = user.dataValues.id;
    done();
  });

  describe('Making a GET request to /users', () => {
    it('Should return error 401 if no or invalid token is provided', (done) => {
      request(app)
        .get('/api/users')
        .set('Authorization', 'invalid-token')
        .expect(401)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('Authentication failed');
          done();
        });
    });

    it('Should return an array of users if all checks passes', (done) => {
      request(app)
        .get('/api/users')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('contactList');
          done();
        });
    });
  });

  describe('Making a GET request to /users/:id', () => {
    it('Should return error 400 if the user id is not an integer', (done) => {
      request(app)
        .get('/api/users/not-an-integer')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('User id can only be an integer');
          done();
        });
    });

    it('Should return error 400 if the user is not found in the DB', (done) => {
      request(app)
        .get('/api/users/2000')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('User not found');
          done();
        });
    });

    it('Should return the user if all checks passes', (done) => {
      request(app)
        .get(`/api/users/${id}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.id).toEqual(id);
          done();
        });
    });
  });

  describe('Making a PUT request to /users/:id', () => {
    it('Should return error 400 if the user id is not an integer', (done) => {
      request(app)
        .put('/api/users/not-an-integer')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('User id can only be an integer');
          done();
        });
    });

    it('Should update the user if all checks passes', (done) => {
      const name = 'New Name';
      request(app)
        .put(`/api/users/${id}`)
        .send({ name })
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body[0]).toHaveProperty('name');
          expect(res.body[0].name).toEqual(name);
          done();
        });
    });
  });

  describe('Making a GET request to /users/:id/messages', () => {
    it('Should return error 400 if the user id is not an integer', (done) => {
      request(app)
        .get('/api/users/not-an-integer/messages')
        .set('Authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('User id can only be an integer');
          done();
        });
    });

    it('Should return the user\' messages if all checks passes', (done) => {
      request(app)
        .get(`/api/users/${contactId}/messages?page=1&limit=5`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('messages');
          expect(res.body.messages.length).toBeGreaterThanOrEqual(1);
          expect(res.body.messages[0].body).toEqual('Hello');
          done();
        });
    });
  });
});
