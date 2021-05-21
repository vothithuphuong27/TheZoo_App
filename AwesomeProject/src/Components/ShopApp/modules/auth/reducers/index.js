import * as ActionTypes from '../actions/types';
const defaultState = {
  loading: false,
  signedInUser: null,
  NotificationData: [],
  BadgeNumber: 0, //1
  addressOrder: [],
  error: null,
};
export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_SIGNIN:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        signedInUser: action.signedInUser,
        error: null,
      };
    case ActionTypes.AUTH_SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        signedInUser: null,
        error: action.error,
      };
    case ActionTypes.AUTH_SIGNOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        signedInUser: action.signedInUser,
        error: null,
      };
    case ActionTypes.AUTH_ADD_ADDRESS_SUCCESS:
      var addressOrder = [
        ...state.addressOrder,
        {
          name: action.addressOrder.name,
          phone: action.addressOrder.phone,
          address: action.addressOrder.address,
        },
      ];
      return {
        ...state,
        addressOrder: addressOrder,
      };
    case ActionTypes.AUTH_GET_ADDRESS_SUCCESS: {
      var addressOrder = [...state.addressOrder];
      // action.addedCartList.ShoppingCarts
      return {
        ...state,
        addressOrder: action.addressOrder.address,
      };
    }
    case ActionTypes.AUTH_CLEAR_ADDRESS: {
      return {
        addressOrder: [],
      };
    }
    case ActionTypes.AUTH_EDIT_ADDRESS:
      var addressOrder = [...state.addressOrder].find(
        (item) => item.address === action.address,
      );
    case ActionTypes.AUTH_UPDATE_ADDRESS:
      var ArrayAddressList = [...state.addressOrder];
      for (let index = 0; index < ArrayAddressList.length; index++) {
        if (index == action.id) {
          ArrayAddressList[index].address = action.address;
          ArrayAddressList[index].name = action.name;
          ArrayAddressList[index].phone = action.phone;
          return {
            ...state,
            addressOrder: [...state.addressOrder],
          };
        } else {
          ////..........................
        }
      }
    case ActionTypes.AUTH_NUMBER_NOTIFICATION:
      var BadgeNumber = state.BadgeNumber + action.numberBadges;
      // console.log(BadgeNumber);
      return {
        ...state,
        BadgeNumber: BadgeNumber,
      };
    case ActionTypes.AUTH_GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        BadgeNumber: action.NotificationData.NumberNotification,
      };
    case ActionTypes.AUTH_UPDATE_NUMBER_BADGES:
      return {
        ...state,
        BadgeNumber: action.numberBadges,
      };
    //   // console.log();
    //   return {
    //     ...state,
    //     NotificationData: action.NotificationData.Notifications,
    //   };
    //XÓA SỐ THÔNG BÁO
    // case ActionTypes.AUTH_CLEAR_NOTIFICATION:
    //   return {
    //     ...state,
    //     BadgeNumber: 0,
    //   };
    // XÓA ĐỊA CHỈ
    case ActionTypes.AUTH_DELETE_ADDRESS:
      var deleteaddress = [...state.addressOrder].filter(
        (item, index) => item.address !== action.address,
      );

      return {
        ...state,
        addressOrder: deleteaddress,
      };
    // XÓA NỘI DUNG CỦA THÔNG BÁO
    // case ActionTypes.AUTH_DELETE_NOTIFICATIONS:
    //   // console.log(action.notification);
    //   var NotificationData = [...state.NotificationData].filter(
    //     (item, index) => index !== action.notification,
    //     // console.log(index),
    //   );

    //   return {
    //     ...state,
    //     NotificationData: NotificationData,
    //   };
    case ActionTypes.AUTH_UPDATE_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.AUTH_UPDATE_SUCCESS_PROFILE:
      // console.log(action);

      return {
        ...state,
        signedInUser: action.signedInUser,
        loading: false,
      };
    default:
      return state;
  }
}
