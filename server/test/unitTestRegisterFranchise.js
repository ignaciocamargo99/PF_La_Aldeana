let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert; 

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe('Tests unitarios sobre API Franchise',()=>{
    
    describe('Check getFranchises',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/franchise')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/franchise')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('Check postFranchise',()=>{
        it.skip('Se inserta correctamente', (done) => {
            chai.request(url)
                .post('/franchise/new')
                .send({ name: 'test', start_date: '2021-1-1', address: 'a', address_number: 123, city: 'a', province: 'a',
                name_manager: 'a', last_name_manager: 'a', dni_manager: 10100100 })
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    expect(res.body.Ok).to.equal(true);
                    done();
                });
        });
    });

});