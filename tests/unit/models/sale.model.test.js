const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const mock = require('../mocks/mocks');

describe('Sale model', function () {
  afterEach(() => sinon.restore());

  it('Find all Sales', async function () {
    sinon.stub(connection, 'execute').resolves([mock.rightSaleBody])

    const allSales = await saleModel.findAllSales();

    expect(allSales).to.be.deep.equal(mock.rightSaleBody)
  });

  it('Find sale by id', async function () {
    sinon.stub(connection, 'execute').resolves([mock.rightSaleBody[0]])

    const findById = await saleModel.findById(1)

    expect(findById).to.be.deep.equal(mock.rightSaleBody[0])
  })
})
