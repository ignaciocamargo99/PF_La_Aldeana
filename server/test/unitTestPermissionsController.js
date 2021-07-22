let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe('Tests unitarios sobre API Permissions',()=>{
    
    describe('Check getPermissions',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/permission')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los permisos como json', (done) => {
            chai.request(url)
                .get('/permission')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('Check getPermissionsRols',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/permission/filter/1')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los permisos de un rol como json', (done) => {
            chai.request(url)
                .get('/permission/filter/1')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
        it('Trae los permisos de venta de un rol admin', (done) => {
            chai.request(url)
                .get('/permission/filter/1')
                .end( function(err,res){
                    expect(res.body[0]).to.have.property('name').to.be.equal('Ventas');
                    done();
                });
        });

    });


});