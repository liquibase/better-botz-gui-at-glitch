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

router.get('/cluster', function(req, res){
  getClusterDetails().then(function(data){
    res.send(data);
  }).catch(function(filteredData){
    res.send(filteredData);
  })
});

router.get('/data', function (req, res) {
  getData().then(function(data){
    res.send(data);
  }).catch(function(filteredData){
    res.send(filteredData);
  })
});

router.get('/moredata', function (req, res) {
  getMoreData().then(function(data){
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

async function getClusterDetails() {
  await client.connect();
  let result = `Connected to ${client.hosts.length} nodes in the cluster: ${client.hosts.keys().join(', ')}`;
  return result;
}

async function getData() {
  await client.connect();
  const result = await client.execute('SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM bb.orders');

  const row = result.first();
  console.log(row['customer_name']);

  return row;
}

async function getMoreData(){
  await client.connect();
  const query = 'SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM bb.orders';
  client.execute(query, [name], { prepare: true })
      .then(function (result) {
        result.rows.forEach(function (row) {
          console.log('%s to %s: %s', row.currencies.get(0), row.currencies.get(1), row.value);
        });
        return result.rows;
      });
}

async function getMetadata() {
  await client.connect();
  const rs = await client.execute('SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM bb.orders WHERE customer_name= ? ;', ['Rachel Pollard']);
  return rs.first()['prod_name'];
}

module.exports = router;
