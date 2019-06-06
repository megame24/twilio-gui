[![CircleCI](https://circleci.com/gh/megame24/twilio-gui.svg?style=svg)](https://circleci.com/gh/megame24/twilio-gui)

# Twilio-gui

A simple application that consumes Twilio's phone number API to provide a chat interface 

## Installation

Follow the steps to install the app.

* Clone the repository from a terminal `git clone https://github.com/megame24/twilio-gui.git`.
* Navigate to the project directory `cd twilio-gui`
* Run `npm install` on the terminal to install server side dependencies.
* Navigate to the client folder `cd client` and run `npm install` to install client side dependencies

## Development setup

Follow the steps below to setup the application for local development

* Create a `.env` file at the root directory, referencing the `.env_sample` file, populate the `.env` file
* Note: A Twilio account's credentials(`TWILIO_ACCOUNT_SID`,
`TWILIO_AUTH_TOKEN`) are needed to setup the application. 
* Note: The application makes use of a simple form of authentication via the `AUTH_HASH` present in the `.env` file. This hash should be generated from [sha256](https://passwordsgenerator.net/sha256-hash-generator/) by providing a password of your choice. The password will be used to login.

## Running the app

Follow the steps below to run the application

* From the root directory, run `npm start` to start the server
* Navigate to the client folder `cd client` and run `npm start` to start the client application

## Testing

### Testing the API

To run the API tests, run `npm test` from the root directory

### Testing the client/front-end

To run the client/front-end tests, navigate to the client folder from the root directory `cd client` and run `npm test`

## Api EndPoints

EndPoint                      |   Functionality
------------------------------|------------------------
POST /auth          |   Authenticate user.
POST /messages/new             |   Message a new number.
POST /messages           |   Message a saved contact.
POST /messages/receive       |   Receive incoming message
GET /phoneNumbers         |   Get the list of available numbers

## Technologies

* `Node`
* `Express`
* `PostgreSQL`
* `Sequelize`
* `React`
* `Redux`
* `Twilio`
