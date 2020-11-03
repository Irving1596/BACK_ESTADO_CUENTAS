const http = require('http');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');
const bodyParser = require("body-parser");

let httpServer;
const db = require('../models/init-models.js');

function initialize() {
    return new Promise((resolve, reject) => {

        // force: true will drop the table if it already exists
        /*db.sequelize.sync({ force: true }).then(() => {
            console.log('Drop and Resync Sequelize');
        });
*/
        const app = express();
        httpServer = http.createServer(app);

        // Combines logging info from request and response
        app.use(morgan('dev'));
        app.use(express.json({
            reviver: reviveJson
        }));

        const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

        function reviveJson(key, value) {
            // revive ISO 8601 date strings to instances of Date
            if (typeof value === 'string' && iso8601RegExp.test(value)) {
                return new Date(value);
            } else {
                return value;
            }
        }

        app.use(bodyParser.json());
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-token");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            next();
        });
        app.use(bodyParser.urlencoded({ extended: false }));
        //rutas de la aplicacion
        app.use(require('./routes/index'));
        httpServer.listen(process.env.PORT)
            .on('listening', () => {
                console.log(`Web server listening on localhost:${process.env.PORT}`);

                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}

module.exports.initialize = initialize;

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports.close = close;