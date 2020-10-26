# WONDERQ

## Introduction

WonderQ is a simple messaging queue system that allows producer add jobs and consumer retrieve jobs within a configurable time.

## Table of Contents

1. <a href="#hosted-app">Link to Hosted App</a>
2. <a href="#application-features">Application Features</a>
3. <a href="#how-to-use">How To Use</a>
4. <a href="#thoughts">Thoughts</a>
5. <a href="#author">Author</a>
6. <a href="#license">License</a>

## Link to Hosted App

- [API link](https://wonderq-api.herokuapp.com/employee)

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
$ git clone https://github.com/obule/wonderq.git

# Go into the repository
$ cd wonder-test

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory and add variable for PORT and AVAILABILITY_TIME
AVAILABILITY_TIME=30000
PORT=5000


# Run the app
$ npm start

# Check the port on the specified port on the env or 9000


# Run test
$ npm run test
```

## API endpoints

```
- /sqs/add-job
Method: POST
Body: { message: string } message to publish
Headers: `authorization: JWT token`
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


- /sqs/:amount # amount is the number of jobs the consumer wants to process
Method: GET
Headers: `authorization: JWT token`
Success Response: {
  success: true,
  data: {
    success: true,
    message: 'Jobs retrieved'
    data: [
      {
      id: number, # Unique id generated for each job
      message: string,
      meta: {
        isAvailable: boolean # If message is available to process.
      }
    }
    ]
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
Headers: `authorization: JWT token`
Success Response: {
  success: true,
  data: {
    success: true,
    message: 'Job successfully proccessed'
    data: true / false
  }
}
Error Response: {
  success: false,
  message: 'Server Error',
  data: null
}
```

## NOTE:

Please add authorization header with this token to access the endpoints

```
token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIEFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.9v5NoVLOjyj5HZwPkPFKb73heDebRT-WsohLqoPO8Qk
```

Example:

```
authorization: 'JWT token'
```

## THOUGHTS

This simple implementaion of Amazon SQS uses an array as the data structure of choice to enqueue and dequeue jobs. This implementation comes with some bottle necks which might add limitations that will prevent the production readiness of the application. Some of the problems and potential solutions/additions are discussed below.

- Data structure used: Using an array is efficient for just local use but it can quickly become a problem when the application grow in size. Such growth can lead to the array been memory intensive to the server, thereby making job retrieval and dequeing slow.
- Using arrays can be ephemeral, meaning when the server reloads, we will loose all the data stored in it. Using a solution like MySQL to persist the information will go a long way in maintaing data intergrity accross the system.
- The current application currently runs on a single server, I think running it on multiple server while keeping on datastore(Redis/Database) will improve speed of the application.
- All the data in the current application are stored in an array. No provision is made to take care of redundancy. If the server crashes, we will loose all the jobs in the queue. I will suggest replicating the data accross multiple nodes to account for system failure will solve the issue of system failure.

## Author

Ruona Izuagbala

## License

MIT

---

```

```
