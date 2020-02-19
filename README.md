# glitchy-fluffy-barnacle

A sample Glitch website built with Node.js using Express and DataStax Apollo.

To start the app:

First set your secure bundle in the path as shown in the app.js file in the following code snippet.

``` javascript
const path = './.data/secure-connect.zip';
```

Run the server as shown:

``` bash
USERNAME=usernameToYourApolloDb PASSWORD=passwordToYourApolloDb bash -c 'node bin/www'
```

As shown in the command above, once variables and such are set, just execute the app.js with `node bin/www`.

Once running, check out the following paths for examples of data retrieval:

http://localhost:3000/datareport >> this is a response via generated jade template w/ the data results.
http://localhost:3000/data >> this is a direct data response of just the JSON response via API get call.
http://localhost:3000/ >> verifies express.js is running with Jade templates!