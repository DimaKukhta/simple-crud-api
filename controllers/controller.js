const persons = require('../db/db');
const { v4: uuidv4, validate } = require('uuid');
const { validateArgs } = require('../utils');

class Controller {
  async getAllPersons() {
    return new Promise((res, rej) => res(persons));
  }

  async getPersonById(id) {
    return new Promise((res, rej) => {
      if (!validate(id)) {
        rej('Invalid id');
      }
      const person = persons.find((person) => person.id === id);
      if (!person) {
        rej('Person not found');
        return;
      }
      res(person);
    });
  }

  async createPerson(data) {
    return new Promise((res, rej) => {
      const { name, age, hobbies } = data;
      if (!name || !age || !hobbies) {
        rej('Required arguments are missing');
        return;
      }

      const validationResult = validateArgs(data);

      if (!validationResult.isValid) {
        rej(validationResult.message);
        return;
      } else {
        const id = uuidv4();

        const person = { id, name, age, hobbies };

        persons.push(person);

        res(person);
      }
    });
  }

  async updatePerson(data) {
    let index = null;
    return new Promise((res, rej) => {
      const result = validateArgs(data);
      if (!result.isValid) {
        rej(result.message);
        return;
      } else {
        const person = persons.find((person, i) => {
          if (person.id === data.id) {
            index = i;
            return true;
          }
          return false;
        });
        if (!person) {
          rej('Person not found');
          return;
        }
        persons[index] = data;
        res(persons[index]);
      }
    });
  }

  async deletePerson(id) {
    return new Promise((res, rej) => {
      if (!id || !validate(id)) {
        rej('Invalid id');
        return;
      }
      let index = null;
      const person = persons.find((person, i) => {
        if (person.id === id) {
          index = i;
          return true;
        }
        return false;
      });

      if (!person) {
        rej('Person not found');
      } else {
        res();
      }
    });
  }
}

module.exports = Controller;
