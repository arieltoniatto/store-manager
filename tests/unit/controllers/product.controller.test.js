const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const prodServ = require('../../../src/services/product.services');
const prodController = require('../../../src/controllers/product.controller');
const mock = require('../mocks/mocks');

chai.use(sinonChai);

describe('Product Controller', function () {
  afterEach(() => sinon.restore());

  it('List all products', async function () {
    sinon.stub(prodServ, 'findAll').resolves(mock.allProductsResponse)

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await prodController.findAll(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.allProductsResponse)
  });

  it('Find product by Id', async function () {
    sinon.stub(prodServ, 'findById').resolves(mock.productSearchNameResponse)

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await prodController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.productSearchNameResponse)
  });

  it('Register new product', async function () {
    sinon.stub(prodServ, 'newProduct').resolves(mock.productServiceResponse)

    const req = { body: mock.rightProductBody }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await prodController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mock.productCreateResponse)
  });

  it('Update product', async function () {
    sinon.stub(prodServ, 'updateProduct').resolves(mock.productServiceResponse)
    sinon.stub(prodServ, 'findById').resolves(mock.productSearchNameResponse)

    const req = { params: { id: 1 }, body: mock.rightProductBody }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await prodController.updateProduct(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(mock.productCreateResponse)
  });

  it('Delete product', async function () {
    sinon.stub(prodServ, 'deleteProduct').resolves(mock.productServiceDelete)
    sinon.stub(prodServ, 'findById').resolves(mock.productSearchNameResponse)

    const req = { params: { id: 1 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await prodController.deleteProduct(req, res)

    expect(res.status).to.have.been.calledWith(204)
  });

  it('Search by query', async function () {
    sinon.stub(prodServ, 'findByName').resolves(mock.productSearchNameResponse)

    const req = { query: { q: 'Martelo' } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await prodController.searchByName(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(mock.productSearchNameResponse)
  })
})
