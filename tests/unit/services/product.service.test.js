const sinon = require('sinon');
const { expect } = require('chai');
const prodServ = require('../../../src/services/product.services');
const prodModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');

describe('Product service', function () {
  describe('Lista todos os produtos', function () {
    after(function () {
      prodModel.findAll.restore();
    });

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

    before(function () {
      sinon.stub(prodModel, 'findAll').resolves(execute)
    })

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

      const response = await prodServ.findAll();

      // console.log('AAAAAAAQUI', response);

      expect(response).to.deep.equal(expected);
    })
  })
  describe('Encontra um produto pelo id', function () {
    before(async function () {
      const execute = [
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ];

      sinon.stub(connection, 'execute').resolves([execute])
    })

    after(async function () {
      connection.execute.restore();
    });

    const expected = {
      "id": 2,
      "name": "Traje de encolhimento"
    };

    const payload = 2;

    it('Retorna um produto pelo id com sucesso', async function () {
      const response = await prodServ.findById(payload);

      expect(response).to.deep.equal(expected);
    })
  })
})
