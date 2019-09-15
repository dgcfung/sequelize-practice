const faker = require('faker');

const users = [...Array(100)].map((user) => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    password: faker.internet.password(8),
    jobTitle: faker.name.jobTitle(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

// Will do the same as above. This is simpler for loop version.
// const users = []
// for(let i = 0; i < 100; i++) {
//   users.push({
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     userName: faker.internet.userName(),
//     password: faker.internet.password(8),
//     jobTitle: faker.name.jobTitle(),
//     createdAt: new Date(),
//     updatedAt: new Date()
//   })
// }

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
