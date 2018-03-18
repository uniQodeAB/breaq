# Breaq

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

An app for keeping track of your employees.

## First step
```
yarn install
```
## Starting the app
The recommended package manager is `yarn` for this app. The app uses Firebase and Google Maps API, and thus require API keys for these. Before starting the app these keys need to be set as environment variables. You can either modify the `.env` file or, recommended, to create a file `.env.local`. This should be the content of the file:

```
REACT_APP_MAP_API_KEY=<Your Google MAP API key>
REACT_APP_FIREBASE_API_KEY=<Your Firebase API key>
```
Execute the start script when the values are set:
```
yarn start
```

## Tests
Run tests
```
yarn test
```
Code coverage
```
yarn coverage
```
