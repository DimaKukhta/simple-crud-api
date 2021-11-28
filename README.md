# simple-crud-api
To run the API, you need to download this repository.
* git clone https://github.com/DimaKukhta/simple-crud-api.git
* git checkout develop
* npm i
* npm run start:dev
* To run tests: npm run test или npm test

You can make the following requests:
* GET: http://localhost:3200/person - get all persons
* GET: http://localhost:3200/person/:id - get person by id
* PUT: http://localhost:3200/person/:id - update person by id
* DELETE: http://localhost:3200/person/:id - delete person by id

Tests are written for three cases: 
1. Get all persons
2. Create person
3. Get person by id