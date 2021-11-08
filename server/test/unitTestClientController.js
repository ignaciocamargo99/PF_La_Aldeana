let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe.skip('Tests unitarios sobre API Users',()=>{
    
    describe('Check getClient',()=>{
        it('Recibe correctamente la funcion', (done) => {
            chai.request(url)
                .get('/clients')
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Trae los datos como json', (done) => {
            chai.request(url)
                .get('/clients')
                .end( function(err,res){
                    expect(res).to.be.json;
                    done();
                });
        });
    });
});