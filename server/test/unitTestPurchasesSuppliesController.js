let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3001';


describe('Obtener todas las compras de insumos: ',()=>{
    it('Deberia obtener todas las compras de insumos', (done) => {
    chai.request(url)
    .get('/api/purchases')
    .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});

/*
describe('Obtener el ultimo numero de compra de las compras de insumos: ',()=>{
    it('Deberia traer el ultimo numero de compra', (done) => {
    chai.request(url)
    .get('/api/purchase/last')
    .end( function(err,res){
            expect(res.body[0]).to.have.property('last_number').to.be.equal(60);
            expect(res).to.have.status(200);
            done();
        });
    });
    it('Deberia obtener una respuesta NO nula/vacia', (done) => {
        chai.request(url)
        .get('/api/purchase/last')
        .end( function(err,res){
            expect(res.body.length).to.be.greaterThan(0);
            done();
        })
    })
        it('Deberia obtener una única respuesta', (done) => {
        chai.request(url)
        .get('/api/purchase/last')
        .end( function(err,res){
            expect(res.body.length).to.be.equal(1);
            done();
        })
    })
});      


describe('Insercion de compra',()=>{
    it('Deberia mostrar un mensaje de error cuando el campo fecha de compra esta vacio', (done) => {
    chai.request(url)
    .post('/api/purchase/new')
    .send({
        date_purchase: "2021-07-23",
        supplier: "Proveedor X",
        total: "80000",
        details: [{purchase_number: 59, id_supply: 1, quantity: 2, subtotal: 20000}, {purchase_number: 59, id_supply: 2, quantity: 2, subtotal: 20000}]})
    .end( function(err,res){
        expect(res).to.have.status(200);
        done();
        });
    });
});
*/
   
   
