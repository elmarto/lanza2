"use strict";
const chai = require('chai');
const chaiHttp = require('chai-http');
const App_1 = require('../../../src/App');
chai.use(chaiHttp);
const expect = chai.expect;
describe('GET api/v1/prospects/:id', () => {
    it('responds with single JSON object', () => {
        return chai.request(App_1.default).get('/api/v1/prospects/1')
            .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
        });
    });
    it('should return Luke Cage', () => {
        return chai.request(App_1.default).get('/api/v1/prospects/1')
            .then(res => {
            expect(res.body.prospect.first_name).to.equal('Erlich');
        });
    });
});
