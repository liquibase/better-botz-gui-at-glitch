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
