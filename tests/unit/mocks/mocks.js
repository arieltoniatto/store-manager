const wrongProductBody = {};
const wrongSizeProductBody = { name: 'Prod' };
const rightProductBody = { name: 'Produto1' };
const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];
const deleteProductResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
];
const productCreateResponse = { id: 4, name: 'Produto1' };
const productUpdateBody = { name: 'Machado do Thor Stormbreaker' };
const productUpdateExistsNameBody = { name: 'Martelo de Thor' };
const productSearchNameResponse = [{ id: 1, name: 'Martelo de Thor' }];
const productServiceResponse = {
  type: null,
  message: {
    id: 4,
    name: 'Produto1',
  },
};
const productServiceDelete = { type: null, message: '' };

module.exports = {
  wrongProductBody,
  wrongSizeProductBody,
  rightProductBody,
  allProductsResponse,
  deleteProductResponse,
  productCreateResponse,
  productUpdateBody,
  productUpdateExistsNameBody,
  productSearchNameResponse,
  productServiceResponse,
  productServiceDelete,
}
