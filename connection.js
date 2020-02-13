"use strict";

const cassandra = require('cassandra-driver');
const dotenv = require('dotenv');
dotenv.config();

function getClientConfiguration() {
    var config = {};
    if (process.env.USEAPOLLO) {
        //Since we are going to use Apollo let's check to make sure we have the username, password, 
        // secure connect bundle path, and keyspace environment variables specified
        if (process.env.DBUSERNAME && process.env.DBPASSWORD &&
            process.env.SECURECONNECTBUNDLEPATH && process.env.KEYSPACE) {
            //Now set the options required to connect to Apollo
            config.cloud = { secureConnectBundle: process.env.SECURECONNECTBUNDLEPATH }
            config.credentials = { username: process.env.DBUSERNAME, password: process.env.DBPASSWORD };
            config.keyspace = process.env.KEYSPACE;
        } else {
            throw Error("You must have the DBUSERNAME, DBPASSWORD, SECURECONNECTBUNDLEPATH, and KEYSPACE environment variables set to use Apollo as your database.")
        }
    } else {
        //Check to make sure that the contact points is specified
        if (process.env.CONTACTPOINTS && process.env.DATACENTER) {
            config.contactPoints = [process.env.CONTACTPOINTS];
            config.localDataCenter = process.env.DATACENTER;
        } else {
            throw Error("You must have the CONTACTPOINTS and DATACENTER environment variables set to use DSE/DDAC/Cassandra as your database.")
        }
        if (process.env.DBUSERNAME && process.env.DBPASSWORD) //if the usename and password are specified then use them
        {
            config.credentials = { username: process.env.DBUSERNAME, password: process.env.DBPASSWORD };
        }
        if (process.env.KEYSPACE) //if the keyspace is specified then use it
        {
            config.keyspace = process.env.KEYSPACE;
        }
    }
    return config;
}

const client = new cassandra.Client(getClientConfiguration());

exports.connection = client.connect()
    .then(function () {
        console.log('Connected to cluster with %d host(s) %j', client.hosts.length, client.hosts.keys());
    })
    .catch(function (err) {
        console.error('There was an error when connecting', err);
        return client.shutdown().then(() => { throw err; });
    });
