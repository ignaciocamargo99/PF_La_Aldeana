let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe.skip('Tests unitarios sobre API Sessions',()=>{
    
    describe('Check getSession',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/session')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/session')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('Check postSession',()=>{
        it.skip('Se inserta correctamente', (done) => {
            chai.request(url)
                .post('/session/new')
                .send({start_date: new Date().getTime(), nick_user: 'Usuario20.'})
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
    
    });
    
    describe('Check updateSession',()=>{
        it.skip('Se actualiza correctamente', (done) => {
            chai.request(url)
                .get('/session/update/Usuario20.')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
    
    });

});