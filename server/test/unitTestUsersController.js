let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe.skip('Tests unitarios sobre API Users',()=>{
    
    describe('Check getUsers',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/users')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/users')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('Check getUsersByNick',()=>{
        it('Trae el usuario correcto', (done) => {
            chai.request(url)
                .get('/users/filter/Usuario20.')
                .end( function(err,res){
                    expect(res.body).to.have.property('Message').to.be.equal('Validando usuario.');
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae el usuario como json', (done) => {
            chai.request(url)
                .get('/users/filter/Usuario20.')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
        
    });
});