let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe('Tests unitarios sobre API Flavors',()=>{
    
    describe('Check getFlavors',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/flavors')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/flavors')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });
});