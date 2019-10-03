# gorbyoyo-translator

## Installation
Install [Node.js](https://nodejs.org/en/) if neccesary
```
git clone https://github.com/cgarcia33/gorbyoyo-translator.git
cd gorbyoyo-translator
npm install
cd backend
npm install
```

## Database
This project uses [NeDB](https://github.com/louischatriot/nedb), which uses a subset of MongoDB's API. No further setup is necessary.

## To run locally
```
cd backend
node server.js
```
In another terminal tab:
```
cd gorbyoyo-translator
npm start
```
Navigate to [http://localhost:3000](http://localhost:3000)

## To run tests
```
cd backend/
npm test
```