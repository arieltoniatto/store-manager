const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

describe('Product Model', function () {
  describe('Lista todos os produtos', function () {
    before(async function () {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Retorna a lista com sucesso', async function () {
      const expected = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ];

      const response = await productModel.findAll();

      expect(response).to.be.deep.equal(expected[0]);
    })
  })
  describe('Encontra um produto pelo id', function () {
    before(async function () {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ];

      sinon.stub(connection, 'execute').resolves([execute])
    })

    after(async function () {
      connection.execute.restore();
    });

    const expected = [{
      "id": 1,
      "name": "Martelo de Thor"
    }];

    const payload = 1;

    it('Retorna um produto pelo id com sucesso', async function () {
      const response = await productModel.findById(payload);

      expect(response).to.deep.equal(expected);
    })
  })
})
