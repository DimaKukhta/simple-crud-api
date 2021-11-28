const http = require('http');
const dotenv = require('dotenv');
const Controller = require('./controllers/controller');
const { getReqData } = require('./utils');

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const controller = new Controller();
  if (req.url === '/person' && req.method === 'GET') {
    const persons = await controller.getAllPersons();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(persons));
  } else if (req.url.startsWith('/person/') && req.method === 'GET') {
    try {
      const id = req.url.split('/')[2];
      const person = await controller.getPersonById(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } catch (e) {
      if (e === 'Invalid id') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else if (e === 'Person not found') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server error' }));
      }
    }
  } else if (req.url === '/person' && req.method === 'POST') {
    try {
      const data = await getReqData(req);
      const person = await controller.createPerson(JSON.parse(data));
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } catch (e) {
      if (e === 'Required arguments are missing') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else if (
        e === 'Name must be a string' ||
        e === 'Age must be a number' ||
        e === 'Hobbies must be an array'
      ) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server error' }));
      }
    }
  } else if (req.url.startsWith('/person/') && req.method === 'PUT') {
    try {
      const id = req.url.split('/')[2];
      const data = await getReqData(req);
      const person = await controller.updatePerson({
        id,
        ...JSON.parse(data),
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } catch (e) {
      if (
        e === 'Invalid id' ||
        e === 'Name must be a string' ||
        e === 'Age must be a number' ||
        e === 'Hobbies must be an array'
      ) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else if (e === 'Person not found') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else if (e === 'Required arguments are missing') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server error' }));
      }
    }
  } else if (req.url.startsWith('/person/') && req.method === 'DELETE') {
    try {
      const id = req.url.split('/')[2];
      await controller.deletePerson(id);
      res.writeHead(204);
      res.end();
    } catch (e) {
      if (e === 'Invalid id') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else if (e === 'Person not found') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: e }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server error' }));
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid route' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

module.exports = server;
