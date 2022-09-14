const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const mock = require('../mocks/mocks');

describe('Product model', function () {
  afterEach(() => sinon.restore());

  it('List all products', async function () {
    sinon.stub(connection, 'execute').resolves([mock.allProductsResponse]);

    const allProducts = await productModel.findAll();

    expect(allProducts).to.be.deep.equal(mock.allProductsResponse)
  });

  it('Find product by id', async function () {
    sinon.stub(connection, 'execute').resolves([mock.productSearchNameResponse[0]])

    const findById = await productModel.findById(1)

    expect(findById).to.be.deep.equal(mock.productSearchNameResponse[0])
  });

  it('Register new product', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])

    const newProduct = await productModel.insert(mock.rightProductBody)

    expect(newProduct).to.be.deep.equal(mock.productCreateResponse)
  })

  it('Update product', async function () {
    sinon.stub(connection, 'execute').resolves([mock.productUpdateBody.name])

    const updatedProduct = await productModel.updateProduct({ id: 1, name: 'Machado do Thor Stormbreaker'})

    expect(updatedProduct.name).to.be.deep.equal(mock.productUpdateBody.name)
  })

  it('Delete product', async function () {
    sinon.stub(connection, 'execute').resolves(null);

    const deleteProduct = await productModel.deleteProd(1)

    expect(deleteProduct).null
  })

  it('Search by query', async function () {
    sinon.stub(connection, 'execute').resolves([mock.productSearchNameResponse])

    const searchByName = await productModel.searchName('arte')

    expect(searchByName).to.be.deep.equal(mock.productSearchNameResponse)
  })
})
