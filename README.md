# better-botz-gui-at-glitch

A sample Glitch website built with Node.js using Express and DataStax Apollo.

To start the app:

First add a `.data` directory and then copy your security bundle file to the path. An example of it being setup is shown in the app.js file in the following code snippet.

``` javascript
const path = './.data/secure-connect.zip';
```

Next, run `npm install` in the root directory of the project to retrieve all fo the project dependencies.

Now run the server as shown:

``` bash
USERNAME=databaseUsername PASSWORD=databasePassword bash -c 'node bin/www'
```

Once running, check out the following paths for examples of data retrieval:

http://localhost:3000/datareport >> this is a response via generated jade template w/ the data results.
http://localhost:3000/data >> this is a direct data response of just the JSON response via API get call.
http://localhost:3000/ >> verifies express.js is running with Jade templates!
