"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const index_router_1 = require('./routes/index.router');
const prospect_router_1 = require('./routes/prospect/prospect.router');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        this.express.use('/', index_router_1.default);
        this.express.use('/api/v1/prospects', prospect_router_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
