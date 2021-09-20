let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe('Tests unitarios sobre API Products',()=>{
    
    describe('Check getTypeProducts',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/typeProducts')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/typeProducts')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('Check getProducts',()=>{
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

    describe('Check getSupplies',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/supplies')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/supplies')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('Check getTypeSupplies',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/typeSupplies')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/typeSupplies')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });
    
    describe('Check postTypeProducts',()=>{
        it('Se inserta correctamente', (done) => {
            chai.request(url)
                .post('/typeProducts')
                .send({name: 'Gaseosas', description: 'Bebidas con gas', id_sector: 1})
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
    
    });

    describe('Check postProduct',()=>{
        it.skip('Se inserta correctamente', (done) => {
            chai.request(url)
                .post('/product/new')
                .send({name: 'Fanta 1 ml', description: 'Bebida con gas grande', price: 500, id_sector: 2, id_product_type: 1})
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });

    });

    describe('Check getProductsSuppliess',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/productSupply/1')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/productSupply/1')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });

    });


    describe('Check updateProduct',()=>{
        it('Se actualiza correctamente', (done) => {
            chai.request(url)
                .put('/products/update')
                .send({name: 'prueba update from test', description: 'test update', price: 500, id_sector: 2, id_product_type: 1, id_product: 56})
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });

    });


    describe('Check deleteProduct',()=>{
        it('Se actualiza correctamente', (done) => {
            chai.request(url)
                .put('/products/delete/')
                .send({id_product: 56})
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });

    });

});

   