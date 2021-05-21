import * as ActionTypes from '../actions/types';

const defaultState = {
  productFavoriteList: [],
  addedCartList: [],
};
export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.MAIN_ADD_TO_CART:
    case ActionTypes.MAIN_INCREASE_CART:
      // FIND ITEM BEFORE ADD TO CART, IF EXISTS THEN UPDATE QUANTITY, ELSE ADD NEW ITEM WITH QUANTITY = 1

      var found = [...state.addedCartList].find(
        (item) => item.products.id === action.product.id,
      );
      if (found) {
        found.quantity++;
        return {
          ...state,
          addedCartList: [...state.addedCartList],
        };
      }
      // ELSE ADD NEW ITEM WITH QUANTITY = 1
      // PUSH
      var addedCartList = [
        ...state.addedCartList,
        {
          products: action.product,
          quantity: action.quantity,
          userid: action.userid,
        },
      ];
      return {
        ...state,
        addedCartList: addedCartList,
      };

    // .....................

    case ActionTypes.MAIN_DECREASE_CART:
      var found = [...state.addedCartList].find(
        (item) => item.products.id === action.product.id,
      );
      if (found) {
        if (found.quantity > 1) {
          found.quantity--;
        }
      }
      return {
        ...state,
        addedCartList: [...state.addedCartList],
      };

    case ActionTypes.MAIN_REMOVE_FROM_CART:
      var addedCartList = [...state.addedCartList].filter(
        (e) => e.products.id !== action.productId,
      );

      return {
        ...state,
        addedCartList: addedCartList,
      };
    case ActionTypes.MAIN_CLEAR_CART:
      return {
        addedCartList: [],
        productFavoriteList: [],
      };
    case ActionTypes.MAIN_TEMP_CART: {
      //  [...state.addedCartList] =
      var addedCartList = [...state.addedCartList];
      // action.addedCartList.ShoppingCarts
      return {
        ...state,
        addedCartList: action.addedCartList.ShoppingCarts,
      };
    }
    case ActionTypes.MAIN_PRODUCT_FAVORITE_LIST: {
      // console.log(action.productFavorites);
      return {
        ...state,
        productFavoriteList: action.productFavorites.productFavorites,
      };
    }
    case ActionTypes.MAIN_PRODUCT_FAVORITE: {
      var found = [...state.productFavoriteList].find(
        (item) => item.id === action.id,
      );
      if (found) {
        found.status = action.status;
        return {
          ...state,
          productFavoriteList: [...state.productFavoriteList],
        };
      }
      // if (!found) {
      var productFavoriteList = [
        ...state.productFavoriteList,
        {
          id: action.id,
          status: action.status,
          imageUrl: action.imageUrl,
          description: action.description,
          name: action.name,
          price: action.price,
        },
      ];
      return {
        ...state,
        productFavoriteList: productFavoriteList,
      };
      // }
    }
    default:
      return state;
  }
}
