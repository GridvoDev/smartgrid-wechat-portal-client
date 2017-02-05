const _ = require('underscore');
const co = require('co');
const should = require('should');
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const portalUIRouter = require('../../../lib/express/routes/portalUI');
const {expressZipkinMiddleware, createZipkinTracer} = require("gridvo-common-js");

describe('portalUIRouter use case test', () => {
    let app;
    let server;
    before(done => {
        function setupExpress() {
            return new Promise((resolve, reject) => {
                app = express();
                app.use(cookieParser());
                app.use(expressZipkinMiddleware({
                    tracer: createZipkinTracer({}),
                    serviceName: 'test-service'
                }));
                app.use('/', portalUIRouter);
                server = app.listen(3001, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };
        function* setup() {
            yield setupExpress();
        };
        co(setup).then(() => {
            done();
        }).catch(err => {
            done(err);
        });
    });
    describe('#get:/water-station?corpID=', () => {
        context('open water app portal ui', () => {
            it('should fail is no open wechat client', done => {
                request(server)
                    .get(`/water-station`)
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        res.text.should.eql("please open this page in wechat");
                        done();
                    });
            });
            it('should redirect to wechat OAuth2.0 auth url', done => {
                request(server)
                    .get(`/water-station?corpID=wechat-corp-id`)
                    .expect(302)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }
                        done();
                    });
            });
        });
    });
    after(done => {
        function teardownExpress() {
            return new Promise((resolve, reject) => {
                server.close(err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };
        function* teardown() {
            yield teardownExpress();
        };
        co(teardown).then(() => {
            done();
        }).catch(err => {
            done(err);
        });
    });
});