let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var should    = require("chai").should();
var assert = require("chai").assert;

chai.use(chaiHttp);
const url= 'http://localhost:3001/api';

describe.skip('Tests unitarios sobre API Supply',()=>{

    describe('Check postSupply',()=>{
        it('Se inserta correctamente', (done) => {
            chai.request(url)
                .post('/supplies')
                .send({ name: "unitTest", description: null, id_supply_type: 2, price_wholesale: 1, price_retail: 1, stock_lot: 1, stock_unit: 1, unit_x_lot: 1 })
                .end( function(err,res){
                    expect(res).to.have.status(200);
                    expect(res.body.Ok).to.equal(true);
                    done();
                });
        });

    });
});
