'use strict';

const fs = require('fs');
const path = './.data/secure-connect.zip';
const { Client } = require('cassandra-driver');
const client = new Client({
  cloud: { secureConnectBundle: path },
  credentials: { username: process.env.USERNAME, password: process.env.PASSWORD }
});

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Better Botz Nous, Welcome' + process.env.USERNAME });
});

router.get('/data', function (req, res) {
  getData().then(function(data){
    res.send(data);
  }).catch(function(filteredData){
    res.send(filteredData);
  })
});

router.get('/metadata', function(req, res){
  getMetadata().then(function (data) {
    res.send(data);
  }).catch(function (filteredData) {
    res.send(filteredData);
  })
});

async function getData() {
  await client.connect();
  const rs = await client.execute('SELECT * FROM system.local');
  await client.shutdown();
  return rs.first()['cluster_name'];
}

async function getSampleRows() {

}

async function getMetadata() {
  var result = "";
  client.metadata.getTable('system', 'local')
      .then(function (tableInfo) {
        result += 'Table ' + tableInfo.name;
        tableInfo.columns.forEach(function (column) {
          result += 'Column ' + column.name + ' with type ' + column.type;
        });
      }).catch(function (filteredData) {
      result = filteredData;
  });
  return "Data: " + result;
}

module.exports = router;
