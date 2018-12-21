const request = require('supertest');
const app = require('../../index');
const { User, Message } = require('../../database/models');

let token;
let contactId;

describe('Messages routes', () => {
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

  describe('Making a POST request to /messages/receive', () => {
    it('Should return error 404 if the phoneNumber to receive message does not exist', (done) => {
      request(app)
        .post('/api/messages/receive')
        .send({
          From: '+11111111111',
          Body: 'Hello',
          To: '+12345678909',
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('User not found');
          done();
        });
    });

    it('Should receive the message if all checks passes', (done) => {
      request(app)
        .post('/api/messages/receive')
        .send({
          From: '+11111111111',
          Body: 'Hello',
          To: '+1234567890',
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
  describe('Making a POST request to /messages/new', () => {
    it('Should return error 400 if phoneNumber wasn\'t provided', (done) => {
      request(app)
        .post('/api/messages/new')
        .set('Authorization', token)
        .send({
          message: 'yo'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('phone number is required');
          done();
        });
    });

    it('Should return error 400 if phone number is not an integer', (done) => {
      request(app)
        .post('/api/messages/new')
        .set('Authorization', token)
        .send({
          message: 'yo',
          phoneNumber: 'abc'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('phone number must be an integer');
          done();
        });
    });

    it('Should return error 400 if message was not provided', (done) => {
      request(app)
        .post('/api/messages/new')
        .set('Authorization', token)
        .send({
          phoneNumber: '+23433456788'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('message is required');
          done();
        });
    });

    it('Should send the message if all checks passes', (done) => {
      request(app)
        .post('/api/messages/new')
        .set('Authorization', token)
        .send({
          phoneNumber: '+1234567870',
          message: 'yo'
        })
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toEqual('Message sent successfully');
          done();
        });
    });
  });
  describe('Making a POST request to /messages', () => {
    it('Should return error 400 if the contactId is not an integer', (done) => {
      request(app)
        .post('/api/messages')
        .set('Authorization', token)
        .send({
          message: 'yo',
          contactId: 'not-an-integer'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('Contact id can only be an integer');
          done();
        });
    });

    it('Should return error 400 if the contact does not exist on the DB', (done) => {
      request(app)
        .post('/api/messages')
        .set('Authorization', token)
        .send({
          message: 'yo',
          contactId: 2000
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('Contact not found');
          done();
        });
    });

    it('Should return error 400 if message was not provided', (done) => {
      request(app)
        .post('/api/messages')
        .set('Authorization', token)
        .send({
          contactId: 2000
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('message');
          expect(res.body.errors.message).toEqual('message is required');
          done();
        });
    });

    it('Should send the message if all checks passes', (done) => {
      request(app)
        .post('/api/messages')
        .set('Authorization', token)
        .send({
          contactId: contactId,
          message: 'yohohoho'
        })
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toEqual('Message sent successfully');
          done();
        });
    });
  });
});
