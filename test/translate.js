//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST translate', () => {
  it('it should 404 & return error without fromLang', (done) => {
    let translateRequest = {
      text: 'I like dogs.',
      toLang: 'es'
    }
    chai.request(server)
        .post('/api/translate')
        .send(translateRequest)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Missing language to translate from.');
          done();
        });
  });
  it('it should 404 & return error without toLang', (done) => {
    let translateRequest = {
      text: 'I like dogs.',
      fromLang: 'es'
    }
    chai.request(server)
        .post('/api/translate')
        .send(translateRequest)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Missing language to translate to.');
          done();
        });
  });
  it('it should return translation', (done) => {
    let translateRequest = {
      text: 'I like dogs.',
      fromLang: 'en',
      toLang: 'es'
    }
    chai.request(server)
        .post('/api/translate')
        .send(translateRequest)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('translation');
          done();
        });
  });
});
