//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST grammar', () => {
  it('it should 404 & return error without fromLang', (done) => {
    let grammarRequest = {
      text: 'Dog is th worst'
    }
    chai.request(server)
        .post('/api/grammar')
        .send(grammarRequest)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No defined language to check.');
          done();
        });
  });
  it('it should return grammar matches', (done) => {
    let grammarRequest = {
      text: 'Dog is th worst',
      fromLang: 'en'
    }
    chai.request(server)
        .post('/api/grammar')
        .send(grammarRequest)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('matches');
          done();
        });
  });
});
