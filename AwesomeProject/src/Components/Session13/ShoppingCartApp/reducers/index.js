import * as ActionTypes from '../actions/types';
const defaultState = {
  addedProducts: [],
};
export default function (state = defaultState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const found = state.addedProducts.find(
        (item) => item.product.id === action.product.id,
      );
      if (found) {
        found.quantity++;
        return {
          ...state,
          addedProducts: [...state.addedProducts],
        };
      }
      var addedProducts = [
        ...state.addedProducts,
        {product: action.product, quantity: action.quantity},
      ];

      return {
        addedProducts: addedProducts,
      };
    case 'REMOVE_CART':
      var removeproduct = [...state.addedProducts].filter(
        (e) => e.product.id !== action.productId,
      );

      return {
        ...state,
        addedProducts: removeproduct,
      };
  }

  return state;
}
