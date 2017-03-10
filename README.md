lin.io
======

lin.io is the project for my personal portfolio website.

## Structure

The page is built on 3 main components

- NodeJS
- Angular 2
- MySQL

To enable SSL, we use Nginx as a proxy (_this is however, not required_)

## Setup

### 1. Clone repo
Clone the repo from github

### 2. Install node-packages
Go to the root of your project, run `npm install`. Then navigate to the `client` folder and run `npm install` again.


### 3. Add _config.json
The _database data_, _token-secret_, _email distribution list_ and other data which should not be publically available.

### 4. Transpile files
Navigate back to your project root, then run `npm run build`. This will build the _front-end_ files.
If no errors occured, you can now saffely run the node server. Either through `npm start`, `nodemon`, `forever start ./bin/www` or some other _server program_.

### 5. Run in development mode
When you are contantly working on the project, you can run `npm run watch` to automatically build the frontend files, and reload your server program.
