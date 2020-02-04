'use strict'

const fs = require('fs');
const path = './.data/secure-connect.zip';
const { Client } = require('cassandra-driver');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Better Botz Nous' });
});

router.get('/data', function (req, res) {
  var theData = 'Nope!';  
  
  var fileExists = fs.existsSync(path);
  if (fileExists) {
    theData = "The file exists.\n"
    
    theData += process.env.USERNAME
    theData += process.env.PASSWORD  
    
    const client = new Client({
      cloud: { secureConnectBundle: path },
      credentials: { username: process.env.USERNAME, password: process.env.PASSWORD }
    });
    
    client.connect();

    // Execute a query
    const rs = client.execute('SELECT * FROM system.local');
    theData += rs.first()['cluster_name']
    
    client.shutdown();
  
    res.send(theData);
  } else {
    res.send("Dammit!");
  }
})

async function getData() {
  const client = new Client({
    cloud: { secureConnectBundle: path },
    credentials: { username: 'username', password: 'password' }
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute('SELECT * FROM system.local');
  console.log(`Hello from cluster: ${rs.first()['cluster_name']}`);

  await client.shutdown();
}

module.exports = router;
