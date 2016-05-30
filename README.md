# hapi RESTful app

A single resource RESTFUL app with persistence, primarily leveraging Hapi as a server-side framework and Mongoose for data modeling and app-wide operations utilizing MongoDB.

---

## Installation

To test out our application and start creating (or culling) dinosaurs of your very own, use your favorite terminal to clone down the repository locally:

```sh
$ git clone https://github.com/stefuhnee/hapi-REST-app.git
```

You will need to download the required dependencies via npm to test out our application. From within the project folder, enter the following in the terminal:

```sh
$ npm install
```

---

## Basic Use

To use the app, you will first need to ensure that you have installed mongod to manage your database interactions.  For further information on mongod installation and use, [check out the mongod docs](https://docs.mongodb.com/manual/reference/program/mongod/).  You will also need [Node.js](https://nodejs.org/en/) installed.

Once you have installed mongod and Node, you will need to create a local database folder within the root of the project. Using the terminal, enter the following:

```sh
$ mkdir db
```

Next, you will need to open 3 separate tabs within your terminal.  Enter the following commands in unique tabs (within the project root):

#### 1. Start up your local server

```sh
$ node index.js
```

#### 2. Start up your database server

```sh
$ mongod --dbpath db --smallfiles
```

This syncs mongod with your local db directory. If your connection is successful, you will see a message within the terminal notifying you that your connection was accepted.

#### 3. Send requests (see below for more information)

```sh
//GET request
$ curl localhost:3000/dinosaur
```

You may use the REST client of your choice, but we are using curl for our demonstration. Note that you will receive back an empty array of dinosaurs if you make a GET request without first creating a dinosaur!

---

## REST Requests

The application currently supports GET, POST, PUT, and DELETE requests to the /dinosaur endpoint.

#### GET request:

Returns an array of dinosaurs currently roaming within the database.
```sh
$ curl localhost:3000/dinosaur
```

#### POST request:

Want to play God? Create a new dinosaur! You will need to include a request body (in JSON format). All properties are optional, but highly encouraged to create a fearsome reptile!

##### __Dinosaur properties:__
* name: String
* carnivore: Boolean
* speed: String
* defensePower: Number
* attackPower: Number

```sh
$ curl -i -X POST -H "Content-Type:application/json" localhost:3000/dinosaur -d '{"name":"slug", "carnivore":false, "speed":"sluggy", "defensePower":2, "attackPower":1}'
```

#### PUT request:

Updates a dinosaur with your desired mutation (or creates a new dinosaur!). You must provide both the \_id string (found using a GET request) and the dinosaur's properties within the request body to update a dinosaur.

```sh
$ curl -i -X PUT -H "Content-Type:application/json" localhost:3000/dinosaur -d '{"_id":"574ca2b0d777903770e00981", "name":"slug", "carnivore":true, "speed":"superslug", "defensePower":2, "attackPower":5000}'
```

#### DELETE request:

You realize that you've made a terrible mistake. Delete a dinosaur by specifying a dinosaur \_id (found using a GET request) within your request url.

```sh
$ curl -i -X DELETE localhost:3000/dinosaur/574ca2b0d777903770e00981
```
---

## Tests

Run tests from the project route one of two ways:

##### Using mocha

```sh
$ mocha
```

##### Using gulp
```sh
$ gulp test
```

---

## Dependencies
* hapi
* mongoose

## Dev Dependencies
* mocha
* chai
* chai-http
* gulp
* gulp-eslint
* gulp-mocha
