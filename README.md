# WONDERQ

## Introduction

WonderQ is a simple messaging queue system that allows producer add jobs and consumer retrieve jobs within a configurable time.

## Table of Contents

1. <a href="#hosted-app">Link to Hosted App</a>
2. <a href="#application-features">Application Features</a>
3. <a href="#how-to-use">How To Use</a>
4. <a href="#author">Author</a>
5. <a href="#license">License</a>

## Link to Hosted App

- [API link](https://craftdrive-api.herokuapp.com/employee)

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Application Features

- Endpoints to create, fetch and publish jobs
- The ability to configure wait time of a particular job
- Specify the amount of job that needs to be processed by a consumer.
- Provide a token based authentication to prevent unauthorized aceess to jobs and the application.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/obule/craftdrive-test.git

# Go into the repository
$ cd wonder-test

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory and add variable for PORT

# Run the app
$ npm start

# Check the port on the specified port on the env or 9000

# To run the app on Docker, you must have docker installed locally and running
$ npm run docker:build
$ npm run docker

# Run test
$ npm run test
```

## API endpoints

```
- /sqs/add-job
Method: POST
Body: { message: string } message to publish
Headers: `Authorization: Bearer token`
Success Response: {
  success: true,
  data: {
    success: true,
    message: 'Job retrieved'
    data: {
      id: number, # Unique id generated for each job
      message: string,
      meta: {
        isAvailable: boolean # If message is available to process.
      }
    }
  }
}
Error Response: {
  success: false,
  message: 'Server Error',
  data: null
}

- /sqs/process-job # Use to deque a job after been processed
Method: POST
Body: { id: string } # Unique Id of the processed job
Headers: `Authorization: Bearer token`
Success Response: {
  success: true,
  data: {
    success: true,
    message: 'Job retrieved'
    data: {
      id: number,
      message: string,
      meta: {
        isAvailable: boolean
      }
    }
  }
}
Error Response: {
  success: false,
  message: 'Server Error',
  data: null
}
```

- GET --- /employee/:id -- Find One
- POST --- /employee
  data {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  }
- PATCH --- /employee Update employee
- DELETE --- /employee/:id Delete employee

```

## NOTE:

Please add authorization header with this token to access the endpoints
token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIEFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.9v5NoVLOjyj5HZwPkPFKb73heDebRT-WsohLqoPO8Qk

Example:
authorization: 'JWT token'

## Author

Ruona Izuagbala

## License

MIT

---
```
