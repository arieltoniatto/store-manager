const sinon = require('sinon');
const { expect } = require('chai');
const prodServ = require('../../../src/services/product.services');
const prodModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');
const validations = require('../../../src/services/validations/validations')
const { invalidName, withoutName, validName } = require('./product.service.mock');
const { response } = require('express');

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

    afterEach(async function () {
      sinon.restore();
    });

    it('Retorna um produto pelo id com sucesso', async function () {
      const execute = [
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ];

      sinon.stub(prodModel, 'findById').resolves(execute)

      const expected = {
        "id": 2,
        "name": "Traje de encolhimento"
      };

      const payload = 2;

      const response = await prodServ.findById(payload);

      expect(response).to.deep.equal(expected);
    })
  })
  // describe('Cadastrar um novo produto', function () {

  //   after(async function () {
  //     sinon.restore();
  //   })
  //   it('Com um nome inválido', async function () {
  //     const response = await prodServ.newProduct(invalidName)

  //     expect(response.type).to.equal('INVALID_VALUE');
  //     expect(response.message).to.equal('\"name\" length must be at least 5 characters long')
  //   })
  //   it('Sem a propriedade name', async function () {
  //     const response = await prodServ.newProduct(withoutName);

  //     expect(response.type).to.equal('MISSING_FIELD');
  //     expect(response.message).to.equal('\"name\" is required')
  //   })
  //   it('Com sucesso', async function () {
  //     sinon.stub(prodModel, 'insert').resolves(validName);

  //     const response = await prodServ.newProduct(validName)

  //     expect(response.type).to.equal(null);
  //     expect(response.message).to.equal(validName);
  //   })
  // })
})
