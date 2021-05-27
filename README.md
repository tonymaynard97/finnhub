# Fund managers daily Tool

The repo was bootstrapped with create-react-app for the client side code to utilise the hot reloading whilst developing. There is also a simple express server which can be found in the `server/` folder which is used to protect the finnhub[https://www.finnhub.io] API secret from being exposed to the world! The server code is kept to the minimum which means operations like searching and filtering etc will be carried out client side.

##### IMPORTANT - For the purpose of this application I have injected the api secret through an environment variable to the node server, in a real application the secret should be stored elsewhere (e.g. AWS secrets manager).

## Available Scripts

Due to using tailwind with CRA the scripts run [craco](https://github.com/gsoft-inc/craco) in order to overide some properties, you can run:

### `yarn dev:client`

Runs the client in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn dev:server`

Runs the server in the development mode using nodemon, this allows the server to reload when changes occur to server files.

### `yarn dev`

Concurrently runs the client and the server in development mode so changes propagate through.

### `yarn start`

Starts a basic express server which serves the static files from the build folder. It is important to run `yarn build` before to get the latest client code.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Running the repo

### Local

In order to run the repository locally you will need to install dependencys, build the project and then start the server, i.e
`yarn install`
`yarn build`
`yarn start`

### Production

The application is deployed [here](https://fm-manager-tm.herokuapp.com/). A docker file has been provided in the event that the application is needed in containerised form. To build this run `docker build .` from the root folder. To run the container locally you have to take note of the build image tag e.g. `d64fea91cb33` and then run `docker run -p XXXX:3000 -d <BUILD_TAG>` where `XXXX` is a port you want to expose the container on.
