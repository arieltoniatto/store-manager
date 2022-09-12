const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

const { productController } = require('../../../src/controllers')
const prodServ = require('../../../src/services/product.services');
const prodController = require('../../../src/controllers/product.controller');

chai.use(sinonChai);

describe('Product Controller', function () {
  describe('Lista todos os produtos', function () {

    after(async function () {
      sinon.restore();
    });

    it('Retorna lista com sucesso e com status 200', async function () {
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

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(prodServ, 'findAll').resolves(expected)

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expected)
    });

    it('Verifica se é encontrado produto com id 2', async function () {
      const expected = [
        {
          "id": 2,
          "name": "Traje de encolhimento"
        }
      ];


      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(prodServ, 'findById').resolves(expected)

      await prodController.findById(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith(expected);

    });
    it('Verifica se há uma mensagem de erro e o status do erro é 404 quando um produto não é encontrado', async function () {
      const req = { params: { id: 99999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(prodServ, 'findById').resolves({ message: 'Product not found' })

      await prodController.findById(req, res)

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});
