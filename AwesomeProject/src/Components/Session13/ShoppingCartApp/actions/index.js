import * as Actiontypes from './types';
export const addtocart = (product, quantity) => ({
  type: Actiontypes.ADD_TO_CART,
  product: product,
  quantity: quantity,
});

export const removecart = (productId) => ({
  type: Actiontypes.REMOVE_CART,
  productId: productId,
});
// export const addtocart = (product, quantity) => ({
//   type: Actiontypes.ADD_TO_CART,
//   product: product,
//   quantity: quantity,
// });
