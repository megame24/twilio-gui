const request = require('supertest');
const app = require('../../index');

describe('Numbers routes', () => {
  describe('Making a GET request to /phoneNumbers', () => {
    it('Should return an array of phoneNumbers', (done) => {
      request(app)
        .get('/api/phoneNumbers')
        .expect(200)
        .end((err, res) => {
          const availableNumbers = process.env.AVAILABLE_PHONE_NUMBERS.split(',');
          expect(res.body.availableNumbers).toEqual(availableNumbers);
          done();
        });
    });
  });
});
