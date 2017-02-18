'use strict';
const _ = require('underscore');
const express = require('express');
const {expressWithZipkinTraceContextFeach:traceContextFeach} = require("gridvo-common-js");
const {logger} = require('../../util');

let router = express.Router();
router.get("/water-station", (req, res) => {
    let traceContext = traceContextFeach(req);
    if (!req.cookies || !req.cookies.memberID) {
        let corpID = req.query.corpID;
        if (!corpID) {
            logger.error(`fail client to open portal ui`, traceContext);
            res.send("please open this page in wechat");
            return;
        }
        let corpUserAuthURI = 'http://wechat.gridvo.com:80/smartgrid-suite/apps/water-station/user-auth';
        let redirectURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpID}&redirect_uri=${corpUserAuthURI}&response_type=code&scope=snsapi_base&state=${corpID}#wechat_redirect`;
        logger.info(`member no auth redirect to water-station auth url`, traceContext);
        res.redirect(redirectURL);
        return;
    }
    let options = {
        root: __dirname + '/lib/express/public/water-station'
    };
    res.sendFile("main.html", options);
});

module.exports = router;