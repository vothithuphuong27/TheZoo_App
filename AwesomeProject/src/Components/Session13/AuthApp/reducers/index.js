import * as Actiontypes from '../actions/types';
const defaultState = {
  loading: false,
  user: null,
  error: null,
};
export default function (state = defaultState, action) {
  switch (action.type) {
    case Actiontypes.AUTH_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case Actiontypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case Actiontypes.AUTH_LOGIN_FAILD:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
