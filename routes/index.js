'use strict';

const connection = require('../connection')


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Better Botz Nous, Welcome!', name: process.env.USERNAME });
});

router.get('/datagrid', function(req, res){
  res.render('datagrid', [{}]);
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


router.get('/test', function (req, res) {
  getClusterName().then(function(data){
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
  let result = `Connected to ${connection.hosts.length} nodes in the cluster: ${connection.hosts.keys().join(', ')}`;
  return result;
}

async function getData() {
  const result = await connection.execute('SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM bb.orders');

  const row = result.first();
  console.log(row['customer_name']);

  return row;
}

async function getClusterName() {
  const result = await connection.execute('select cluster_name from system.local');

  const row = result.first();

  return row;
}

async function getMoreData(){
  const query = 'SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM bb.orders';
  connection.execute(query, [name], { prepare: true })
      .then(function (result) {
        result.rows.forEach(function (row) {
          console.log('%s to %s: %s', row.currencies.get(0), row.currencies.get(1), row.value);
        });
        return result.rows;
      });
}

async function getMetadata() {
  const rs = await connection.execute('SELECT customer_name, address, description, price, prod_id, prod_name, sell_price FROM bb.orders WHERE customer_name= ? ;', ['Rachel Pollard']);
  return rs.first()['prod_name'];
}

module.exports = router;
