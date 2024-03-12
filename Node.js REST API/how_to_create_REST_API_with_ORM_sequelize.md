# HOW TO CREATE AN REST API WITH ORM SEQUELIZE

![Static Badge](https://img.shields.io/badge/VERSION-v1.0.0-blue) ![Static Badge](https://img.shields.io/badge/LAST%20RELEASE-11%2F03%2F2024-purple) ![Static Badge](https://img.shields.io/badge/AUTHOR-santichio-gren)

In this tutorial, I gonna make a step by step to setup a repositorie of a Node.JS REST API, with ORM Sequelize and Express.

## INDICE

- [HOW TO CREATE AN REST API WITH ORM SEQUELIZE](#how-to-create-an-rest-api-with-orm-sequelize)
  - [INDICE](#indice)
  - [ABOUT THE PROJECT](#about-the-project)
  - [PREREQUISITES](#prerequisites)
  - [LIBRARIES AND FRAMEWORKS](#libraries-and-frameworks)
  - [INITIALIZE  THE PROJECT](#initialize--the-project)
  - [CONFIGURE DEV FILES](#configure-dev-files)
  - [SET UP DIRECTORIES](#set-up-directories)
  - [CONFIGURE EXPRESS](#configure-express)
  - [CONFIGURE SEQUELIZE](#configure-sequelize)
  - [CREATE A MODEL](#create-a-model)
  - [SETUP THE BASE SERVICES AND CONTROLLERS](#setup-the-base-services-and-controllers)
  - [CREATE A NEW SERVICE](#create-a-new-service)
  - [CREATE A NEW CONTROLLER](#create-a-new-controller)
  - [CREATE A NEW ROUTE](#create-a-new-route)
  - [TEST AND VALIDATE](#test-and-validate)
  - [CONCLUSION](#conclusion)
  - [COMPLEMENTARY READ](#complementary-read)

## ABOUT THE PROJECT

The premisses herer is to create an REST API in Node.JS, for an SQL data base type. This tutorial gonna cover the primary steps to setup the dependecies, configure dev files, and configure the ORM and libraies to work properie.

I gonna use the Model-View-Controller (MVC) architectural pattern, that separetes an application into three main logical components:

- The MODEL: make an interface with data base;
- The VIEW: make an interface to the user;
- The CONTROLLER: handle application logical.

[Read more here](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), for get more information about MVC architectural.

In the end, you shoul have an operational REST API with a basic CRUD for a user handle, with tips to impruve the application.

## PREREQUISITES

To handle all the information in this article, you gonna need a basic knowledge fo the following topics:

- JavaScript ES6
- Terminal comands
- JS Modules
- NPM

Also, you gonna have installed Node.JS in your machine, for a step-by-step guide to install it, [click here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).

For testing the request, and be able to chose request method, we gonna use the Postman, a software for test API routes, you can [download here](https://www.postman.com/downloads/).

> [!NOTE]
> In this tutorial we are using the Node.JS version v20.11.1 LTS.

## LIBRARIES AND FRAMEWORKS

For this project run propery, we gonna use the following NPM packages, with their versions:


| PACKAGE | VERSION | DESCRIPTION | 
|---------|---------|-------------|
| express | v4.18.3 | Web framework |
| sequelize | v6.37.1 | ORM librarie |
| sequelize-cli | v6.6.2 | Command line for sequelize |
| sqlite3 | 5.1.7 | Data base |

And for dev packages, we gonna use the following:

| PACKAGE | VERSION | DESCRIPTION | 
|---------|---------|-------------|
| eslint | v8.57.0 | Code analyzer |
| nodemon | v3.1.0 | Server restart tool |


## INITIALIZE  THE PROJECT

1. First of all, its required to initialize a Node.JS application, for it, open an terminal in the root of the project, and run:

```
npm run init
```

2. Follow the steps to configure your project, as set the name, the version, author and etc...

3. Insstall the dependencies of the project, with the command:
```
npm i express@4.18.3 sequelize@6.37.1 sqlite3@5.1.7 --save-exact
```

4. Install dev dependecies, with the command:
```
npm i nodemon@3.1.0 sequelize-cli@6.6.2 -D --save-exact
```

5. Configure ESLint, with the command:
```
npm init @eslint/config
```

6. Follow the steps to configure ESLint as you want.

> [!IMPORTANT]
> To configure ESLint propery, chose the **commonjs** module type, because Sequelize doesn't work with `import ... from ...` statement!

## CONFIGURE DEV FILES

For now, we gonna star configure the dev files, to help us with the delopment of wour application.

1. Open the `.eslintrc.json` file;

2. Add adicional rules, like:
```
"rules": {
        "semi": ["error", "never"],
        "quotes": ["error", "single"],
        "indent": ["error", "tab"],
        "no-unused-vars": [
            "error",
            {
                "vars": "all",
                "args": "none",
                "ignoreRestSiblings": false
            }
        ]
    }
```
> [!NOTE]
> For additons rules, visit the rules reference [here](https://eslint.org/docs/latest/rules/).

3. Open the `package.json` file, and add a script inside `"scripts:"` block, to initiate Nodemon:
```
"dev": "nodemon server.js"
```

4. Create a `.gitignore` file, copy and past this:
```
.DS_Store
node_modules
.env
```
> [!TIP]
> Create a complete `.gitignore` file with [gitignore.io](https://www.toptal.com/developers/gitignore/).

5. Create the data base file, named exact: `database.sqlite` in the root of the project.

## SET UP DIRECTORIES

To follow the best praticals of an MVC architecture, setup the basic directories. 

1. In the root of your project, create a `server.js` file, and a `src/` folder;
2. Inside `src/`, cheate this folders and files:
   - `controller/` folther with a `Controller.js` file inside;
   - `routes/` folder with a `index.js` and `testRoute.js` file inside;
   - `services/` folder with a `Services.js` file inside;
   - `app.js` file.

In the end, you should have created a basic schema like this:

```
project-name/
|
├-- src/
|   ├-- controllers/
|   |   └-- Controler.js
|   |
|   ├-- routes/
|   |   ├-- index.js
|   |   └-- testRoute.js
|   |
|   ├-- services/
|   |   └-- Services.js
|   |
|   └-- app.js
|
└-- server.js
```

> [!NOTE]
> This schema represents the files and folders created, you shold have more files and folders like `node_modules/`, `.eslintrc.json`, `package.json` and etc.

## CONFIGURE EXPRESS

For a basic operant API, you need to follow some steps:

1. Open the `./server.js` file and copy and paste the following code:
```
const app = require('./src/app.js')

const PORT = 3000

app.listen(PORT, () => {
	console.log(`Server listen at port ${PORT}! Access via http://localhost:3000`)
})
```

2. Open the `./src/app.js` file and copy and paste the following code:
```
const express = require('express')

const routes = require('./routes')

const app = express()
routes(app)

module.exports = app
```

3. Open the `./src/routes/index.js` and copy and paste the following code:
```
const express = require('express')

const testRoute = require('./testRoute.js')

module.exports = app => {
	app.use(
		express.json(),
        testRoute
	)
}
```

4. Open the `./src/routes/testRoute.js`, and copy and past the following code:
```
const { Router } = require('express')

const router = Router()

router.get('/test', (req, res) => {
	res.status(200).send('Hello World!')
})

module.exports = router
```

5. For test propose, if everything was setup corretly, run the comand in the terminal, in the root folder:
```
npm run dev
```

6. Now you should recive the following in terminal:
```
> store@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
Server listen at port 3000! Access via http://localhost:3000
``` 

7. Open Postman, and select the method GET, and enter the URL `http://localhost:3000/test`, than send!

8. You should recive the `Hello World!` string, that means the application is working. Success!

9. Now you can delete the `./src/routes/testRoute.js` file, and remove the import and inside `app.use()` block.

In this moment you have completed the minimun setup of Express.

## CONFIGURE SEQUELIZE

This steps is for follow an archicture, using the best practices in MCV. The Sequelize have a tool to help boostrap a new project, but need some atention.

1. In terminal, inside the rood folder, enter this command for initialize the Sequelize:
```
npx sequelize-cli init
```

2. This gonna create four folders: `config`, `models`, `migrations` and `seeders`. But is created in the root, so we gonna copy this folders and past in `./src` folder, for better organization.

3. IN this moment, the Sequelize-cli "don't know" were the files are, so in the root folder, we gonna create a file and name it exact like that: `.sequelizerc`.

4. Open the created file `./.sequelizerc`, and copy and paste the configurations:
```
const path = require('path')

module.exports = {
    'config': path.resolve('./src/config', 'config.json'),
    'models-path': path.resolve('./src/models'),
    'seeders-path': path.resolve('./src/seeders'),
    'migrations-path': path.resolve('./src/migrations'),
}
```

This gonna tell Sequelize-cli where to search for the files.

5. Open the `./src/config/config.json` file, and here you can configure the database conection, we gonna use the SQLite DB in development enviroment, so copy the following code and paste inside `"development": {...}` block, replacing the original code:
```
"storage": "./database.sqlite",
"dialect": "sqlite"
```

> [!NOTE] 
> Learn more about sequelize-cli project bootstrapping [here](https://sequelize.org/docs/v7/cli/).

## CREATE A MODEL

This chapter describe the steps to create a model, we can also tell that is for create a table to. Every time that is required to create a model or a table, follow this steps.

1. In terminal, enter the `model:generate` command. This command requires two options: `--name` that defines the name of model, and `--attributes` that defines the model attributes (or table colluns). For our example, we gonna create a User model:
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```

2. Sequelize setup the table name same the model name, we gonna need to change that, open the `./src/models/User.js` file (in our example, if you have other name, open it), and in the second argument of the `User.init()` function, add the following parameter:
```
tableName: 'users'
```

> [!TIP]
> Its a good practice to name the tables in our Data Base, with snake case and lowercase in prural (lowercase separeted with underline). Since the Sequelize use JavaScrip Class to create the models, the name gonna be in camel case, so we need to pass the `tableName:` propetie.

3. Make the association in the `static associate()` function. We dont gonna handle this in the article, so [click here](https://sequelize.org/docs/v7/associations/basics/) to have more informations about association basics.

4. When you make the step 1, the Sequelize creates a migration file, and we need to make some changes to create with the correct name. First serach all paramters that refers to `'Users'` and change to `'users'`.

5. Now we gonna make the migration, the step to tell Sequelize to update our Data Base, copy our migration file name in `./src/migrations`, and enter the command:
```
npx sequelize-cli migration:generate --name xxx-migration-example
```

> [!NOTE]
> When you migrate a model to Data Base, Sequelize creates 2 more fields (createdAt and updatedAt). This fields is generated automatic by the migration function, and registrer the create date, and last update.

> [!TIP]
> If is the first setup of the project, make all the models and migrate all with one comand.

> [!IMPORTANT]
> If your models have associations, create first the models that don't have associations, then create the models with associations!

> [!WARNING]
> The comand `npx sequelize-cli migration:generate` without the `--name` paramter, runs all migration in the folder, and overwrite the migrated models.

## SETUP THE BASE SERVICES AND CONTROLLERS

Following the best practies, we gonna use a pattern that puts a services between controlers and models, called Services. This gonna handle the logical of the application, and the controller gonna have the only function to pass to model the functions.

We gonna use some benefits of JavaScrip Class, and create a base service, that gonna have the most used logics in one file, and other services extends this base. We will do the same with controllers, gonna have a base controller, that content all basics functions and the others controllers extends this base controller.

1. Starting with the Services, open the `./src/services/Services.js` file, and add the following code:
```
const dataSource = require('../models')

class Services {
	constructor (modelName) {
		this.model = modelName
	}

	async getAllRecords() {
		return dataSource[this.model].findAll()
	}

	async getOneRecordById(id) {
		return dataSource[this.model].findByPk(id)
	}

	async createRecord(dataOfRecord) {
		return dataSource[this.model].create(dataOfRecord)
	}

	async updateRecord(updatedData, id) {
		const listOfUpdatedRecords = dataSource[this.model].update(updatedData, {
			where: { id: id }
		})

		if (listOfUpdatedRecords[0] === 0) {
			return false
		} else {
			return true
		}
	}

	async deleteRecord(id) {
		return dataSource[this.model].destroy({ where: { id: id}})
	}
}

module.exports = Services
```

> [!NOTE]
> In this code we have a class with a constructor that recive the `modelName` as parameter (to make it generic), and each `async function()` returns the instances of Sequelize  with their methods. In this example I provide the functions for a basic CRUD.

2. Open the `./src/controllers/Controller.js` file, and copy and paste the following code:
```
class Controller {
	constructor(serviceEntity) {
		this.serviceEntity = serviceEntity
	}

	async getAll(req, res) {
		try {
			const recordsList = await this.serviceEntity.getAllRecords()
			return res.status(200).json(recordsList)
		} catch (err) {
			//error
		}
	}

	async getOneById(req, res) {
		const { id } = req.params

		try {
			const record = await this.serviceEntity.getOneRecordById(Number(id))
			return res.status(200).json(record)
		} catch (err) {
			// error
		}
	}

	async createNew(req, res) {
		const dataToCreate = req.body

		try {
			const newRecordCreated = await this.serviceEntity.createRecord(dataToCreate)
			return res.status(200).json(newRecordCreated)
		} catch (err) {
			// error
		}
	}

	async update(req, res) {
		const { id } = req.params
		const dataUpdated = req.body

		try {
			const isUpdated = await this.serviceEntity.updateRecord(dataUpdated, Number(id))

			if (!isUpdated) {
				return res.status(400).json({ message: 'Record doesn\'t updated!'})
			} else {
				return res.status(200).json({ message: 'Successfuly updated!' })
			}
		} catch (err) {
			// error
		}
	}

	async delete(req, res) {
		const { id } = req.params

		try {
			await this.serviceEntity.deleteRecord(Number(id))
			return res.status(200).json({ message: `ID ${id} deleted!` })
		} catch (err) {
			return res.status(500).json(err.message)
		}
	}
}

module.exports = Controller
```

> [!NOTE] 
> In this code I provide the controllers for a basic CRUD. In this class, have a constructor that need to recive a instance of a Service, so each `async function()` gonna have access to the service methods, and return it.

> [!WARNING]
> Pay attention in use the same method name in the const, and function name in `./src/services/Service.js`!

## CREATE A NEW SERVICE

In this chapter, I gonna show how to create a service that extends the base service and where tyou create a services to specific model, that dont have the need to share with other services.

1. Create a new file in `./src/services/` with the name of the model plus the word services (ModelName + Services + .js), in our example `./src/services/UserServices.js`.

2. Open the created file, and copy and paste this code:
```
const Services = require('./Services.js')

class UserServices extends Services {
	constructor() {
		super('User')
	}
}

module.exports = UserServices
```

> [!NOTE]
> In this code we import the base Services, and create a new class that extend the base Services, and in the `super()` we pass a string with the model name.

3. If you need to add a specific method, you need to create a new `async function()` under the constructor block, following the same concepts of base Services.

## CREATE A NEW CONTROLLER

Here I gonna show how to create a new controller that extends the base Controller and link it with the services created.

1. Create a new file in `./src/controllers` with the name of the model plus the word Controller (ModelName + Controller + .js), in our example `./src/services/UserController.js`.

2. Open the created file, and copy and paste the following code:
```
const Controller = require('./Controller')
const UserServices = require('../services/UserServices.js')

const userServices = new UserServices()

class UserController extends Controller{
	constructor() {
		super(userServices)
	}
}

module.exports = UserController
```

> [!NOTE]
> In this code, we import the base Controller and, in our case, the UserService, than atributte to a const the instance of UserService. Next, we create a new class that extends the base Controller and pas in super parameter the instance created from UserServices.

3. If you created a specific service, you gonna need to create a new `async function()` that gonna return the service method data, following the same concepts of base Controller.

## CREATE A NEW ROUTE

To finish the API, we need to make the View part of MCV, that is the interface of controllers and the client request. In this chapter we gonna follow the steps to create the routes of our API.

1. Create a new file in `./src/routes/`, with the name of model plus the word Route (modelName + Route + .js), in our example `./src/routes/UserRoute.js`.

2. Open the created file, and copy and paste the following code:
```
const { Router } = require('express')

const UserController = require('../controllers/UserController.js')

const userController = new UserController()

const router = Router()

router.get('/users', (req, res) => userController.getAll(req, res))
router.get('/users/:id', (req, res) => userController.getOneById(req, res))
router.post('/users', (req, res) => userController.createNew(req, res))
router.put('/users/:id', (req, res) => userController.update(req, res))
router.delete('/users/:id', (req, res) => userController.delete(req, res))

module.exports = router
```

> [!NOTE]
> In this code, we import the Router function from Express, and import the UserController. Than we create a new instance of UserControle, and now we can user their methods. To create a new request route, use the methods of Router (GET, POST, PUT, DELETE), and pass the URL route in first parameter, and a callback function that return the controller method. Here I provide the routes for a basic CRUD.

## TEST AND VALIDATE

Now we finish the basic for our API create, update, delete, and list the users from a Data Base. Now its time to see if everything works property!

1. Start the server, enter in terminal:
```
npm run dev
```

2. We don't have anything in our Data Base, so we need to make a registration. So open the Postman, and select the POST method, than copy this URL:
```
http://localhost:3000/users
```

1. Click in the body section, select raw, than select JSON.

2. Type a json, using the models attributes set in you model. In our case it will look something like this:
```
{
    "firstName": "Gabriel",
    "lastName": "Santichio",
    "email": "gabriel@santich.io",
    "password": "secreat@123"
}
```

3. Send it! (do more than one time)

4. Now, to see if successs the registration, select the GET method, and with the same URL, send it!

5. You shoul recive an array with all users registred in our Data Base!

6. Test each route to see if works.

## CONCLUSION

Congratulations, now you have basic REST API using Express and ORM Sequelize, now you can add more models, services, controllers and routes!

> [!IMPORTANT]
> When you create a new flow of informations, you need to remember that for each model, you gonna need a corresponding services, and for each services you need a corresponding controller, but for each controller, its not necessarie have a route, its depend the applicantion needs.

> [!TIP]
> To start a new model creation, use this steps to be more easy: generate the model, migrate the model to data base, create the services, create the controllers, than use in routes.

## COMPLEMENTARY READ

- [Sequelize Documentation](https://sequelize.org/docs/v7/);
- [Sequelize CLI bootstrapping](https://sequelize.org/docs/v7/cli/);
- [Associations](https://sequelize.org/docs/v7/category/associations/);
- [Migration](https://sequelize.org/docs/v7/models/migrations/);
- [Querying](https://sequelize.org/docs/v7/category/querying/).