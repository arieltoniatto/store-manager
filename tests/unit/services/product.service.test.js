const sinon = require('sinon');
const { expect } = require('chai');
const prodServ = require('../../../src/services/product.services');
const prodModel = require('../../../src/models/product.model');
const mock = require('../mocks/mocks');

describe('Product service', function () {
  afterEach(() => sinon.restore());

  it('List all products', async function () {
    sinon.stub(prodModel, 'findAll').resolves(mock.allProductsResponse)

    const allProducts = await prodServ.findAll();

    expect(allProducts).to.be.deep.equal(mock.allProductsResponse);
  });

  it('Find product by Id', async function () {
    sinon.stub(prodModel, 'findById').resolves([mock.productSearchNameResponse])

    const findById = await prodServ.findById(1)

    expect(findById).to.be.deep.equal(mock.productSearchNameResponse)
  });

  it('Register new product', async function () {
    sinon.stub(prodModel, 'insert').resolves(mock.rightProductBody)

    const newProduct = await prodServ.newProduct(mock.rightProductBody.name)

    expect(newProduct.message.name).to.be.deep.equal(mock.productCreateResponse.name)
  });

  it('Register new product with missing field', async function () {
    sinon.stub(prodModel, 'insert').resolves(mock.wrongProductBody)

    const err = await prodServ.newProduct(mock.productServiceError)

    expect(err).to.have.property('type')
  })

  it('Update product', async function () {
    sinon.stub(prodModel, 'updateProduct').resolves([mock.productCreateResponse])

    const updatedProduct = await prodServ.updateProduct(mock.productUpdateBody)

    expect(updatedProduct.message[0]).to.be.deep.equal(mock.productCreateResponse)
  });

  it('Update product with missing field', async function () {
    sinon.stub(prodModel, 'updateProduct').resolves([mock.wrongProductBody])

    const err = await prodServ.updateProduct(mock.productServiceError)

    expect(err).to.have.property('type')
  })

  it('Delete product', async function () {
    sinon.stub(prodModel, 'deleteProd').resolves(mock.deleteProductResponse)

    const deleteProduct = await prodServ.deleteProduct(3)

    expect(deleteProduct).to.have.property('type')
    expect(deleteProduct).to.have.property('message')
  });

  it('Search by query', async function () {
    sinon.stub(prodModel, 'searchName').resolves([mock.productSearchNameResponse])

    const searchByName = await prodServ.findByName('arte')

    expect(searchByName).to.be.deep.equal(mock.productSearchNameResponse)
  });
})
