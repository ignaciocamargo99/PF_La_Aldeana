let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3001';


describe.skip('Obtener todas las compras de insumos: ',()=>{
    it('Deberia obtener todas las compras de insumos', (done) => {
    chai.request(url)
    .get('/api/purchases')
    .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});
