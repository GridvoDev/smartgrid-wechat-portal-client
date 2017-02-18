'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const {expressZipkinMiddleware} = require("gridvo-common-js");
const {logger, tracer} = require('./lib/util');
const {portalUIRouter} = require('./lib/express');

let app;
app = express();
app.use(cookieParser());
app.use(expressZipkinMiddleware({
    tracer: tracer,
    serviceName: 'smartgrid-wechat-portal-client'
}));
app.use('/', portalUIRouter);
app.listen(3001, (err) => {
    if (err) {
        logger.error(err.message);
    }
    else {
        logger.info("express server is starting");
    }
});