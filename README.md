# glitchy-fluffy-barnacle

A sample Glitch website built with Node.js using Express and DataStax Apollo.

To start the app:

First set your secure bundle in the path as shown in the app.js file in the following code snippet.

``` javascript
const path = './.data/secure-connect.zip';
```

Then to pass the username and password that are necessary, either setup a `.env` file, or setup your environment variables with a USERNAME and PASSWORD variables, or pass them in as shown in the command below.

``` bash
USERNAME=usernameToYourApolloDb PASSWORD=passwordToYourApolloDb bash -c 'node bin/www'
```

As shown in the command above, once variables and such are set, just execute the app.js with `node bin/www`.
