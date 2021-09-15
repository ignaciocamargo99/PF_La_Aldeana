let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe('Tests unitarios sobre API Sales',()=>{
    
    describe('Check getPayTypes',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/payTypes')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/payTypes')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe.skip('Check getProducts',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/products')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/products')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('Check postSale',()=>{
        it.skip('Se inserta correctamente', (done) => {
            chai.request(url)
                .post('/sales/new')
                .send({ date_hour: "2021-08-24", total_amount: 123, id_pay_type: 1,
                    details: JSON.stringify([{ id_detail_sale: 1, id_product: 1, quantity: 1, subtotal: 800 }])
                })
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    expect(res.body.Ok).to.equal(true);
                    done();
                });
        });

    });

});