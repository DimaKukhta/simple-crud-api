let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('person', () => {
  let mockPerson = null;
  describe('/GET all persons', () => {
    it('it should GET all the persons', (done) => {
      chai
        .request(server)
        .get('/person')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('/POST person', () => {
    it('it should create new person', (done) => {
      let person = {
        name: 'Name1',
        age: 15,
        hobbies: [],
      };
      chai
        .request(server)
        .post('/person')
        .send(person)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(person.name);
          res.body.should.have.property('age').eql(person.age);
          res.body.should.have.property('hobbies').eql(person.hobbies);
          res.body.should.have.property('id');
          mockPerson = res.body;
          done();
        });
    });
  });

  describe('/GET', () => {
    it('it should get error if user not found', (done) => {
      chai
        .request(server)
        .get('/person/' + mockPerson.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(mockPerson.name);
          res.body.should.have.property('age').eql(mockPerson.age);
          res.body.should.have.property('hobbies').eql(mockPerson.hobbies);
          res.body.should.have.property('id').eql(mockPerson.id);
          done();
        });
    });
  });
});
