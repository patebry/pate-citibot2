## Goal of this project

This Citibot app was made to list, create, edit, show, and delete Cities from the Citibot database while creating a Trello board and purchasing a phone number from Twillio for each city created.

## Cloning the Repo

First change into the directory you want this application to be stored in

Next in the terminal run the code (git needs to be installed)
`git clone https://github.com/patebry/pate-citibot2.git (directory name)`
This will clone the repository into the `(directory name)` you choose

Now  change directories with the code `cd (directory name)`

## Dependencies
To install all of the dependencies run `yarn add` or `npm install -S`
This will add all of the dependencies in a package.json file

##Setting up Auth0 variables
Inside of the src directory there is a file called auth0-variables.js. This is where you can set up your auth0 variables to be used in the app.

The contents of the file look like this

```export const AUTH_CONFIG = {
  domain: '',
  clientId: '',
  callbackUrl: ''
}
```

Fill in the domain key with your auth0 user URL. The clientID can be found on your own auth0 page. Last fill in the callbackUrl key with the callback URL you have approved in auth0.

##Starting the app
run the command `yarn start` or `npm start` to start the app on port 3000

## Getting the api
The app will function but there will be no data if the api is not run at the same time!

Clone the repository form Github with this code in your terminal
`git clone https://github.com/patebry/pate-citibot-api.git (directory name)`

Use the README.md file on its repository for more instructions on setting up the api
