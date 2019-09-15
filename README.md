# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# Sequelize

"[Sequelize](http://sequelizejs.com) is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more." - sequelize.org

Sequelize is a JavaScript Object Relational Mapping tool! Its an abstraction layer for raw SQL. Instead of raw SQL we can use JavaScript to interact with our database.

##

> Let's take five minutes and read what an ORM is: 
>
> - [What is an ORM and why you should use it](https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a)

##

Great, but how do we use Sequelize? Let's start by installing the [Sequelize Client](https://github.com/sequelize/cli):

```sh
cd sequelize-practice
npm init -y
npm install sequelize pg
npm install --save-dev sequelize-cli
```

Next we will initialize a Sequelize project then open it in VS Code:

```sh
npx sequelize-cli init
code .
```
> Let's get familiar with all the commands available to us: `npx sequelize-cli --help`

Let's configure our Sequelize project to work with Postgres:

sequelize-practice/config/config.json
```js
{
  "development": {
    "database": "sequelize_practice_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "sequelize_practice_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "sequelize_practice_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

Cool, now create the Postgres database:

```sh
npx sequelize-cli db:create
```

Next we will create a User model:

```sh
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,userName:string,password:string,jobTitle:string
```

Below is the User model and an associated migration that will be created from the above command: 

sequelize/models/user.js

```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    jobTitle: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
```

sequelize/migrations/20190914184520-create-user.js

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
```

Now we need to execute our migration which will create the users table in our Postgres database along with columns:

```sh
npx sequelize-cli db:migrate
```

> If you made a mistake, you can always rollback: `npx sequelize-cli db:migrate:undo`

Now let's create a seed file:

```sh
npx sequelize-cli seed:generate --name users
```

We are going to user an npm package called [faker](https://www.npmjs.com/package/faker) to generate fake information to populate our database!

```sh
npm install faker
```

Let's edit the file sequelize/seeders/20190904165805-users.js

```js
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

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
```

Execute the seed file:

```sh
npx sequelize-cli db:seed:all
```

> Made a mistake? You can always undo: `npx sequelize-cli db:seed:undo`

Drop into psql and query the database for the demo user:

```sh
psql sequelize_practice_development
SELECT * FROM "Users";
```

Don't forget to create a .gitignore file `touch .gitignore`!

```sh
/node_modules
.DS_Store
```

Finally commit your changes and push it up.

```sh
git checkout -b setup-sequelize
git add -A
git commit -m "setup sequelize"
git push -u origin setup-sequelize
```

Done!

## Resources

- https://sequelize.org/master/manual/migrations.html
