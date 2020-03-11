'use strict';

const path = './.data/secure-connect.zip';
const { Client } = require('cassandra-driver');
const client = new Client({
  cloud: { secureConnectBundle: path },
  credentials: { username: process.env.ASTRAUSER, password: process.env.ASTRAPASSWORD }
});

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Better Botz' });
});

router.get('/datareport', function (req, res) {
  getMoreData().then(function(data){
    res.render('datareport', { data } );
  }).catch(function(filteredData){
    res.send(filteredData);
  })
});

router.get('/data', function (req, res) {
  getMoreData().then(function(data){
    res.send(data);
  }).catch(function(filteredData){
    res.send(filteredData);
  })
});

async function getMoreData(){
  const result = await client.execute('SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM betterbotz.orders');
  return result.rows;
}

module.exports = router;
