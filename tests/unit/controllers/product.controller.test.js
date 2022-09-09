const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');

describe('Product Controller', function () {
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
      sinon.stub(productService, 'findAll').resolves(execute[0])
    });

    after(async function () {
      sinon.restore();
    });

    it('Retorna lista com sucesso', async function () {
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

      const respose = await productController.findAll();

      expect(respose.json).to.be.deep.equal(expected);
    })

    // it('Verifica se é chamado o status com o código 200', async function () {
    //   const req = {};
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   await productController.findAll();

    //   expect(res.status).to.have.been.calledOnceWith(200);

    // })
  })
})
