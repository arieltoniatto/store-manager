// const sinon = require('sinon');
// const { expect } = require('chai');
// const saleServ = require('../../../src/services/sales.services');
// const saleModel = require('../../../src/models/sales.model');
// const mock = require('../mocks/mocks');

// describe('Sale service', function () {
//   afterEach(() => sinon.restore())

//   it('Create new sale', async function () {
//     sinon.stub(saleModel, 'insertSales').resolves(3)

//     const newSale = await saleServ.newSale(mock.rightSaleBody)

//     expect(newSale).to.have.property('type')
//     expect(newSale).to.have.property('message')
//   });
// });
