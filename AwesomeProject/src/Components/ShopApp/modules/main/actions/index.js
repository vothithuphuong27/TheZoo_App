import * as ActionTypes from './types';

export const addToCartAction = (product, quantity = 1, userid) => ({
  type: ActionTypes.MAIN_ADD_TO_CART,
  product: product,
  quantity: quantity,
  userid: userid,
});

export const increaseCartAction = (product, quantity = 1, userid) => ({
  type: ActionTypes.MAIN_INCREASE_CART,
  product: product,
  quantity: quantity,
  userid: userid,
});
export const decreaseCartAction = (product, quantity = 1) => ({
  type: ActionTypes.MAIN_DECREASE_CART,
  product: product,
  quantity: quantity,
});
export const removeFromCartAction = (productId) => ({
  type: ActionTypes.MAIN_REMOVE_FROM_CART,
  productId: productId,
});
export const clearCartAction = () => ({
  type: ActionTypes.MAIN_CLEAR_CART,
});
export const mainTempCart = () => ({
  type: ActionTypes.MAIN_TEMP_CART,
});
export const addProductFavoriteAction = (
  id,
  favoriteProduct,
  imageUrl,
  description,
  name,
  price,
) => ({
  type: ActionTypes.MAIN_PRODUCT_FAVORITE,
  id: id,
  status: favoriteProduct,
  imageUrl: imageUrl,
  description: description,
  name: name,
  price: price,
});
